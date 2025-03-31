import { useState, useEffect } from "react";
import NoteInput from "./NoteInput";
import SearchBar from "./SearchBar";
import NoteList from "./NoteList";
import { auth, db } from "../firebaseConfig";
import {
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import axios from "axios";
import "./HomePage.css";

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
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

  const logout = () => signOut(auth);

  const saveNote = async () => {
    if (!note.trim() || !user) return;
    await addDoc(collection(db, "notes"), {
      uid: user.uid,
      title: title || null,
      content: note,
      summary: summary || null,
      createdAt: Timestamp.now(),
    });
    setTitle("");
    setNote("");
    setSummary("");
    setFilteredNotes(null);
  };

  const updateNote = async (
    id: string,
    updatedContent: string,
    updatedSummary?: string,
    updatedTitle?: string
  ) => {
    const ref = doc(db, "notes", id);
    const updateData: any = {
      content: updatedContent,
      summary: updatedSummary ?? null,
    };
    if (updatedTitle !== undefined) {
      updateData.title = updatedTitle;
    }
    await updateDoc(ref, updateData);
  };

  const summarizeNoteById = async (id: string, content: string) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `Summarize this note:\n\n${content}` }],
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
      const ref = doc(db, "notes", id);
      await updateDoc(ref, { summary: result });
    } catch (err) {
      console.error("Summarization failed:", err);
    }
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
          content: "You are an assistant that filters and finds relevant notes for a user based on their query.",
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

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredNotes(null);
    }
  }, [searchQuery]);

  return (
    <div className="homepage-container">
      <div className="homepage-wrapper">
        <div className="homepage-header">
          <div className="logout-container">
            <button onClick={logout} className="logout-button">
              Logout
            </button>
            <p className="user-info">Logged in as {user?.displayName}</p>
          </div>
        </div>

        <SearchBar
          query={searchQuery}
          onChange={setSearchQuery}
          onSearch={handleAISearch}
          loading={searching}
        />

        <NoteInput
          note={note}
          title={title}
          onChange={setNote}
          onTitleChange={setTitle}
          onSave={saveNote}
          loading={loadingSummary}
        />

        <NoteList
          notes={filteredNotes ?? notes}
          onSave={updateNote}
          onSummarize={summarizeNoteById}
        />
      </div>
    </div>
  );
}
