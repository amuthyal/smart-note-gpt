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
      <div className="w-full max-w-xl bg-white shadow rounded-xl px-4 py-3 flex items-center gap-3">
        <input
          type="text"
          placeholder="Take a note..."
          className="flex-grow bg-transparent text-sm focus:outline-none"
          value={note}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          onClick={onSave}
          className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={onSummarize}
          className="text-sm bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
        >
          {loading ? "..." : "Summarize"}
        </button>
      </div>
    );
  }
  