# 🧠 Smart Note App

A clean, AI-powered note-taking web app built with **React**, **Firebase**, and **OpenAI GPT-3.5**. Create, edit, summarize, and search notes with a simple, modern interface.



---

## ✨ Features

- 📝 Take notes with **titles** and full content
- 🤖 Generate summaries using **GPT-3.5**
- 🔍 Search notes using **AI-powered filtering**
- 🔐 Sign in with **Google (Firebase Auth)**
- 💾 Store notes in **Firebase Firestore**
- 🧊 Edit notes inside **modals**
- 🧱 Clean, responsive UI with **custom CSS**
- ✅ Notes persist across refreshes

---

## ⚙️ Tech Stack

- **Frontend:** React + TypeScript
- **Auth & Database:** Firebase (Auth + Firestore)
- **AI:** OpenAI GPT-3.5 API
- **Styling:** Plain CSS (no Tailwind)
- **Build Tool:** Vite

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/smart-note-app.git
cd smart-note-app

2. Install Dependencies
npm install

3. Setup Environment Variables
VITE_OPENAI_API_KEY=your-openai-api-key

4. Firebase Setup

Go to Firebase Console

Create a project

Enable Google Sign-in under Authentication

Enable Cloud Firestore and set appropriate security rules

Add your Firebase config to firebaseConfig.ts:
// src/firebaseConfig.ts
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

5. Run the Dev Server
npm run dev

App runs at http://localhost:5173

📁 Project Structure
src/
├── components/
│   ├── NoteInput.tsx
│   ├── NoteCard.tsx
│   ├── NoteModal.tsx
│   ├── NoteList.tsx
│   └── SearchBar.tsx
├── pages/
│   └── HomePage.tsx
├── firebaseConfig.ts
├── App.tsx
├── main.tsx
public/
└── index.html

📦 Future Improvements
🗃️ Note organization (folders/tags)

🌙 Dark mode toggle

📤 Export notes to markdown/PDF

🧹 Delete/archive notes

📱 Mobile app (React Native or PWA)

📜 License
MIT — free for personal and commercial use.

🙏 Acknowledgements
OpenAI

Firebase

React

Made with ❤️ by Akhila Muthyala


