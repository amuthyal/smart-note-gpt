import { useEffect, useState } from "react";
import { auth, provider, db } from "./firebaseConfig";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import axios from "axios";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [note, setNote] = useState("");
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchNotes(currentUser.uid);
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

  const logout = () => {
    signOut(auth);
  };

  const saveNote = async () => {
    if (!note.trim() || !user) return;

    await addDoc(collection(db, "notes"), {
      uid: user.uid,
      content: note,
      summary: summary || null,
      createdAt: Timestamp.now(),
    });

    setNote("");
    setSummary("");
  };

  const fetchNotes = async (uid: string) => {
    const q = query(collection(db, "notes"), where("uid", "==", uid));
    onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(data);
    });
  };

  const summarizeNote = async () => {
    if (!note.trim()) return;
    setLoadingSummary(true);

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: `Summarize this note:\n\n${note}`,
            },
          ],
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
        }
      );

      const result = response.data.choices[0].message.content;
      setSummary(result);
    } catch (err) {
      console.error("Summarization failed:", err);
      setSummary("Error generating summary.");
    }

    setLoadingSummary(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold text-center">Smart Note App</h1>

      {!user ? (
        <button
          onClick={login}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Logged in as {user.displayName}
            </p>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Logout
            </button>
          </div>

          <textarea
            className="w-full border p-2 rounded"
            rows={4}
            placeholder="Write your note here..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>

          <div className="flex gap-2">
            <button
              onClick={saveNote}
              className="bg-green-500 text-white px-4 py-2 rounded w-full"
            >
              Save Note
            </button>
            <button
              onClick={summarizeNote}
              className="bg-purple-600 text-white px-4 py-2 rounded w-full"
            >
              {loadingSummary ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          {summary && (
            <div className="bg-gray-100 p-3 rounded border mt-4">
              <h3 className="font-semibold mb-1">Summary:</h3>
              <p>{summary}</p>
            </div>
          )}

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Your Notes</h2>
            <ul className="space-y-4">
              {notes.map((n) => (
                <li key={n.id} className="border p-3 rounded bg-white">
                  <p className="font-medium">{n.content}</p>
                  {n.summary && (
                    <p className="text-sm text-gray-500 mt-1">
                      <strong>Summary:</strong> {n.summary}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
