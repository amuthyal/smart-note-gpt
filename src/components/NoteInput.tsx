import { useState, useRef, useEffect } from "react";
import "./NoteInput.css";

type NoteInputProps = {
  note: string;
  onChange: (val: string) => void;
  onSave: () => void;
};

export default function NoteInput({ note, onChange, onSave }: NoteInputProps) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [note]);

  const handleSave = () => {
    if (note.trim()) {
      onSave();
      setTitle("");
      onChange(""); // clear input
      setExpanded(false);
    }
  };

  const handleClose = () => {
    setExpanded(false);
    setTitle("");
    onChange(""); // clear content
  };

  return (
    <div
      className={`note-input-container ${expanded ? "expanded" : ""}`}
      onClick={() => setExpanded(true)}
    >
      {expanded && (
        <input
          type="text"
          className="note-input-title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}

      <textarea
        ref={textareaRef}
        className="note-input-textarea"
        placeholder="Take a note..."
        value={note}
        onChange={(e) => onChange(e.target.value)}
        rows={1}
      />

      {expanded && (
        <div className="note-input-actions">
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
