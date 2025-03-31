import { useState, useRef, useEffect } from "react";
import "./NoteInput.css";

type NoteInputProps = {
  note: string;
  title: string;
  onChange: (val: string) => void;
  onTitleChange: (val: string) => void;
  onSave: () => void;
  loading: boolean;
};

export default function NoteInput({
  note,
  title,
  onChange,
  onTitleChange,
  onSave,
  loading,
}: NoteInputProps) {
  const [expanded, setExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

  const handleSave = () => {
    if (note.trim() || title.trim()) {
      onSave();
      onChange("");
      onTitleChange("");
      setExpanded(false);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    onTitleChange("");
    setExpanded(false);
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // Sync height & width with shadow
  useEffect(() => {
    if (textareaRef.current && shadowRef.current) {
      shadowRef.current.textContent = note + "\u200b"; // zero-width space to force sizing
      const { offsetHeight, offsetWidth } = shadowRef.current;
      textareaRef.current.style.height = offsetHeight + "px";
      textareaRef.current.style.width = offsetWidth + "px";
    }
  }, [note]);

  return (
    <div
      className={`note-input-container ${expanded ? "expanded" : ""}`}
      onClick={() => !expanded && setExpanded(true)}
    >
      {expanded && (
        <input
          type="text"
          className="note-input-title"
          placeholder="Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      )}

      <div className="note-input-wrapper">
        <textarea
          ref={textareaRef}
          className="note-input-field"
          placeholder="Take a note..."
          value={note}
          onChange={handleNoteChange}
          rows={1}
        />
        <div ref={shadowRef} className="textarea-shadow" />
      </div>

      {expanded && (
        <div className="note-input-actions">
          <button className="save-button" onClick={handleSave}>
            {loading ? "Saving..." : "Save"}
          </button>
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}
