# 🧠 Smart Note App

A clean, AI-powered note-taking web app built with **React**, **Firebase**, and **OpenAI GPT-3.5**. Create, edit, summarize, and search notes with a simple, modern interface.

![Smart Note App Screenshot](./src/assets/preview.png)

---

## ✨ Features

- 📝 Take notes with **titles** and full content
- 🤖 Generate summaries using **GPT-3.5**
- 🔍 Search notes using **AI-powered filtering**
- 🔐 Sign in with **Google (Firebase Auth)**
- 💾 Store notes in **Firebase Firestore**
- 🧊 Edit notes inside **modals**
- 🌐 Backend API protected using **Firebase Functions**
- 🧱 Clean, responsive UI with **custom CSS**
- ✅ Notes persist across refreshes

---

## ⚙️ Tech Stack

- **Frontend:** React + TypeScript (with Vite)
- **Backend Functions:** Firebase Cloud Functions (Express)
- **Authentication & Database:** Firebase Auth + Firestore
- **AI:** OpenAI GPT-3.5 via secure Cloud Function
- **Styling:** Custom CSS (no Tailwind)

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/smart-note-app.git
cd smart-note-app


### 2. Install Dependencies
npm install

###3. Setup Environment Variables

VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-msg-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FUNCTIONS_URL=https://us-central1-your-project-id.cloudfunctions.net/api
Note: VITE_FUNCTIONS_URL is used to call Firebase backend functions (like /summarize)

###4. Firebase Setup

Go to Firebase Console

Create a project

Enable Google Sign-in under Authentication

Enable Cloud Firestore and set appropriate security rules

Add your Firebase config to firebaseConfig.ts:
// src/firebaseConfig.ts

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

⚡ Firebase Functions Setup

cd functions
npm install

Set your OpenAI key securely using Firebase CLI:

firebase functions:config:set openai.key="your-openai-api-key"
firebase deploy --only functions

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


