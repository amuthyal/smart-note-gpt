import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4ZfI0F2_bOO--7_duMKbM3_3dIxbzQMw",
    authDomain: "smart-note-gpt.firebaseapp.com",
    projectId: "smart-note-gpt",
    storageBucket: "smart-note-gpt.firebasestorage.app",
    messagingSenderId: "665004871094",
    appId: "1:665004871094:web:c8ad7df69be032b2398517",
    measurementId: "G-NWKLXD1M8T"
  };
  

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
