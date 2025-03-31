import { useRef, useState, useEffect } from "react";
// ...

export default function NoteInput({ note, onChange, onSave }: NoteInputProps) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    if (note.trim()) {
      onSave();
      setTitle("");
      onChange("");
      setExpanded(false);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitle("");
    onChange("");
    setExpanded(false);
  };

  // Resize only to fit content height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [note]);

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
        className="note-input-field"
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
