# Discord HypeSquad Changer

A premium, open-source, and 100% client-side web tool to change or remove your Discord HypeSquad house badge (Bravery, Brilliance, or Balance). 

## 🚀 Live Demo
You can access the live tool here: **[Your GitHub Pages URL will show here once deployed]**

## 📖 About the Project
Since Discord removed the HypeSquad quiz options directly from the settings interface in late 2025, users can no longer change or remove their HypeSquad badges natively. However, the official HTTP endpoints still exist. 

This tool serves as an easy-to-use, secure, and beautiful interface that interacts directly with Discord's endpoints (`POST` to join a house, `DELETE` to leave HypeSquad) right from your browser.

## 🔒 Security First
* **100% Client-Side**: This application runs entirely in your web browser. There is no backend server, database, or API recording your data.
* **Direct Connection**: Your authorization token is sent directly to Discord's official endpoint (`https://discord.com/api/v9/hypesquad/online`). It is never stored, sent to third-parties, or logged.
* **Open Source**: The code is hosted publicly on GitHub, allowing anyone to audit the source code to verify its safety.

## 🛠️ How to Use
1. Enter your Discord **Authorization Token**.
2. Select the house you want to join (Bravery, Brilliance, or Balance).
3. Click **Activate House**.
4. To remove your badge, simply enter your token and click **Leave HypeSquad**.
5. Refresh your Discord client (`Ctrl + R` on Desktop or web) to see your new badge.

## 📦 How to Deploy on GitHub Pages
1. Create a public repository on GitHub named `discord-hypesquad`.
2. Push these files (`index.html`, `style.css`, `app.js`, `README.md`) to the repository.
3. Go to **Settings** -> **Pages** in your GitHub repository.
4. Under **Build and deployment**, select **Deploy from a branch** and set the branch to `main` (or `master`), folder to `/ (root)`.
5. Click **Save**. Your site will be online in a few seconds!
