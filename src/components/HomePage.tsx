import NoteInput from "./NoteInput";
import SearchBar from "./SearchBar";
import NoteList from "./NoteList";

import { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import {
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

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [note, setNote] = useState("");
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<any[] | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchNotes(currentUser.uid);
    });
    return () => unsubscribe();
  }, []);

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
    setFilteredNotes(null);
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
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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

  const handleAISearch = async () => {
    if (!searchQuery.trim() || notes.length === 0) return;
    setSearching(true);
    try {
      const messages = [
        {
          role: "system",
          content:
            "You are an assistant that filters and finds relevant notes for a user based on their query.",
        },
        {
          role: "user",
          content: `Here are the user's notes:\n${notes
            .map((n, i) => `Note ${i + 1}: ${n.content}`)
            .join("\n")}\n\nQuery: ${searchQuery}\n\nReturn the most relevant notes.`,
        },
      ];

      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages,
          temperature: 0.3,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      const reply = res.data.choices[0].message.content;
      const matches = notes.filter((note) =>
        reply.toLowerCase().includes(note.content.slice(0, 20).toLowerCase())
      );

      setFilteredNotes(matches);
    } catch (error) {
      console.error("AI Search failed:", error);
      setFilteredNotes([]);
    }
    setSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">Logged in as {user?.displayName}</p>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>

        <SearchBar
          query={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleAISearch}
          loading={searching}
        />

        <NoteInput
          note={note}
          onChange={setNote}
          onSave={saveNote}
          onSummarize={summarizeNote}
          loading={loadingSummary}
        />

        <NoteList notes={filteredNotes ?? notes} />
      </div>
    </div>
  );
}
