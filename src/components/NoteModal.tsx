import { useState } from "react";
import "./NoteModal.css";
import axios from "axios";

type NoteModalProps = {
  id: string;
  content: string;
  summary?: string;
  onClose: () => void;
  onUpdateNote: (id: string, updatedContent: string, updatedSummary?: string) => void;
};

export default function NoteModal({
  id,
  content,
  summary,
  onClose,
  onUpdateNote,
}: NoteModalProps) {
  const [updatedContent, setUpdatedContent] = useState(content);
  const [updatedSummary, setUpdatedSummary] = useState(summary || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: `Summarize this note:\n\n${updatedContent}` }],
          temperature: 0.5,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );
      const generated = res.data.choices[0].message.content;
      setUpdatedSummary(generated);
    } catch (error) {
      console.error("Failed to summarize:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedContent(e.target.value);
    setEditing(true);
    setUpdatedSummary("");
  };

  const handleSave = () => {
    onUpdateNote(id, updatedContent, updatedSummary || undefined);
    setEditing(false);
  };

  return (
    <div className="note-modal-overlay">
      <div className="note-modal">
        <textarea
          className="note-modal-textarea"
          value={updatedContent}
          onChange={handleChange}
          placeholder="Edit your note..."
        />
        <div className="note-modal-actions">
          <button onClick={handleSummarize} disabled={loading}>
            {loading ? "Summarizing..." : "Summarize"}
          </button>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Close</button>
        </div>
        {updatedSummary && !editing && (
          <div className="note-summary">
            <strong>Summary:</strong> {updatedSummary}
          </div>
        )}
      </div>
    </div>
  );
}
