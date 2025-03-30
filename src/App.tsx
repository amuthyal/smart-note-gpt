import { useEffect, useState } from "react";
import { auth, provider } from "../src/firebaseConfig";
import { signInWithPopup, onAuthStateChanged, User } from "firebase/auth";
import SignInPage from "./components/SignInPage";
import HomePage from "./components/HomePage";

export default function App() {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ?? null);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  if (user === undefined) return null;
  if (!user) return <SignInPage onSignIn={login} />;

  return <HomePage />;
}
