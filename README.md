# 👻 Ghost-Commits

A Full Stack web application that analyzes a GitHub user's "Coding DNA." It fetches repository data via the GitHub GraphQL API and categorizes developers into "Archetypes" based on their commit habits and language proficiency.

## 🚀 Features
* **Skill Radar:** A dynamic Radar Chart (Chart.js) visualizing language experience.
* **Archetype Engine:** Detects coding styles like:
    * **🦉 Night Owl:** High commit activity between 10 PM and 5 AM.
    * **🧹 Code Cleaner:** Commits with more deletions than additions (Refactoring focus).
* **Real-time Analysis:** Fetches live data directly from GitHub's servers.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla), Chart.js
* **Backend:** Node.js, Express
* **API:** GitHub GraphQL API, Axios

## 📦 Installation & Setup
1. Clone the repository: `git clone https://github.com/YOUR_USERNAME/ghost-commits.git`
2. Install dependencies: `npm install`
3. Add your GitHub Personal Access Token in `server.js`.
4. Start the server: `node server.js`
5. Open `index.html` in your browser.
