const express = require('express');
const axios = require('axios');
const cors = require('cors');
app.use(cors({
  origin: 'https://abhinav-singh-git.github.io/ghost-commit/'
}));

const app = express();
app.use(express.json());

const myToken = process.env.GITHUB_TOKEN;
    const { username } = req.params;
    console.log(`--- Request for user: [${username}] ---`);

    const query = {
        query: `
        {
          user(login: "${username}") {
            login
            repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}) {
              nodes {
                name
                languages(first: 5) {
                  edges { size node { name } }
                }
                defaultBranchRef {
                  target {
                    ... on Commit {
                      history(first: 30) {
                        nodes {
                          committedDate
                          additions
                          deletions
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`
    };

    try {
        const response = await axios.post('https://api.github.com/graphql', query, {
            headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
        });

        if (response.data.errors) {
            console.log("❌ GitHub Error:", response.data.errors[0].message);
            return res.status(400).json({ error: response.data.errors[0].message });
        }

        const user = response.data.data.user;
        if (!user) return res.status(404).json({ error: "User not found" });

        let languages = {};
        let nightOwlScore = 0;
        let cleanerScore = 0;

        user.repositories.nodes.forEach(repo => {
            repo.languages.edges.forEach(l => {
                languages[l.node.name] = (languages[l.node.name] || 0) + l.size;
            });

            // Commit Archetypes
            const commits = repo.defaultBranchRef?.target?.history?.nodes || [];
            commits.forEach(c => {
                const hour = new Date(c.committedDate).getHours();
                if (hour < 5 || hour > 22) nightOwlScore++;
                if (c.deletions > c.additions) cleanerScore++;
            });
        });

        console.log("✅ Success! Data sent to browser.");
        res.json({
            username: user.login,
            stats: { languages },
            archetypes: {
                nightOwl: nightOwlScore > 3,
                theCleaner: cleanerScore > 5
            }
        });

    } catch (err) {
        console.log("❌ Server Crash:", err.message);
        res.status(500).json({ error: "Server connection failed." });
    }
});

app.listen(3000, () => console.log('🚀 Server spinning at http://localhost:3000'));
