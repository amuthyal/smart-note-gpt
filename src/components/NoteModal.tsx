import { useState } from "react";
import "./NoteModal.css";
import axios from "axios";

type NoteModalProps = {
  id: string;
  title?: string;
  content: string;
  summary?: string;
  onClose: () => void;
  onUpdateNote: (
    id: string,
    updatedContent: string,
    updatedSummary?: string,
    updatedTitle?: string
  ) => void;
};

export default function NoteModal({
  id,
  title: initialTitle,
  content,
  summary,
  onClose,
  onUpdateNote,
}: NoteModalProps) {
  const [updatedContent, setUpdatedContent] = useState(content);
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle || "");
  const [updatedSummary, setUpdatedSummary] = useState(summary || "");
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://us-central1-smart-note-gpt.cloudfunctions.net/api/summarize",
        { content: updatedContent }
      );
      const generated = res.data.summary;
      setUpdatedSummary(generated);
      onUpdateNote(id, updatedContent, generated, updatedTitle);
    } catch (error) {
      console.error("Failed to summarize:", error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdatedContent(e.target.value);
    setUpdatedSummary("");
    setEditing(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(e.target.value);
    setEditing(true);
  };

  const handleSaveAndClose = () => {
    onUpdateNote(id, updatedContent, updatedSummary || undefined, updatedTitle);
    setEditing(false);
    onClose();
  };

  return (
    <div className="note-modal-overlay">
      <div className="note-modal">
        <input
          type="text"
          className="note-modal-title"
          value={updatedTitle}
          onChange={handleTitleChange}
          placeholder="Title"
        />
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
          <button onClick={handleSaveAndClose}>Save</button>
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
