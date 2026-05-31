# 🔮 Discord HypeSquad Changer

A premium, highly secure, and 100% client-side web application designed to instantly change or remove your Discord HypeSquad house badge (Bravery, Brilliance, or Balance). 

👉 **Live Demo**: [nicolsafr1dev.github.io/discord-hypesquad](https://nicolsafr1dev.github.io/discord-hypesquad/)

Since Discord removed the HypeSquad quiz options directly from the user settings interface in late 2025, users can no longer change or remove their HypeSquad badges natively. This utility acts as a graphical interface to interact with the remaining official Discord API endpoints.

---

## ⚡ Core Features
* **Instant Activation**: Choose between the three HypeSquad houses (**Bravery**, **Brilliance**, or **Balance**) and claim your badge in a single click.
* **Badge Removal**: Easily leave the HypeSquad program and clear the badge from your profile.
* **100% Client-Side**: All API requests are sent directly from your browser to Discord's official endpoints. There is no middleman backend, database, or logging, keeping your authorization token 100% private.
* **Real-time API Feedback**: The tool handles and explains API response states, notifying you of successful changes, expired tokens (401), invalid payloads (400), or rate limits (429).
* **Modern Premium Interface**: Built with a responsive, glassmorphic dark theme styled after Discord's modern design language, complete with smooth animations and interactive glow effects.
* **Embedded Step-by-Step Guide**: Includes a built-in guide on how to safely retrieve your authorization token from your browser's developer console.

---

## 🔒 Security & Privacy
Because this tool requires your Discord **Authorization Token**, safety is our highest priority:
1. **Direct Communication**: The site communicates only with `https://discord.com/api/v9/hypesquad/online` using secure HTTPS.
2. **Zero Backend**: This project is hosted on GitHub Pages as static HTML/CSS/JS. It is physically incapable of storing or sending your token anywhere else.
3. **Auditability**: The source code is open and simple, making it easy for any developer to review and verify that no token harvesting exists.

---

## 🛠️ How to Use
1. Copy your Discord authorization token (follow the guide at the bottom of the page).
2. Paste the token into the input field (you can toggle visibility for privacy).
3. Select your desired HypeSquad house or click **Leave HypeSquad**.
4. Confirm the success message and refresh your Discord client (`Ctrl + R` in the app or browser) to see the badge on your profile.

---

## 📦 Static Deployment on GitHub Pages
To host this tool online yourself for free:
1. Create a new public repository on GitHub named `discord-hypesquad`.
2. Push the files in this directory to your repository.
3. Open your repository on GitHub and go to **Settings** -> **Pages**.
4. Set the build source to **Deploy from a branch**, select `main` (or `master`) and click **Save**.
5. Your website will be live in less than a minute at `https://<your-username>.github.io/discord-hypesquad/`!
