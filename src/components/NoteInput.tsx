import "./NoteInput.css";

type NoteInputProps = {
  note: string;
  onChange: (val: string) => void;
  onSave: () => void;
  onSummarize: () => void;
  loading: boolean;
};

export default function NoteInput({
  note,
  onChange,
  onSave,
  onSummarize,
  loading,
}: NoteInputProps) {
  return (
    <div className="note-input-container">
      <input
        type="text"
        placeholder="Take a note..."
        className="note-input"
        value={note}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSave} className="note-button save">
        Save
      </button>
      <button onClick={onSummarize} className="note-button summarize">
        {loading ? "..." : "Summarize"}
      </button>
    </div>
  );
}
