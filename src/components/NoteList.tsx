import NoteCard from "./NoteCard";
import "./NoteList.css";

type Note = {
  id: string;
  content: string;
  summary?: string;
};

type NoteListProps = {
  notes: Note[];
};

export default function NoteList({ notes }: NoteListProps) {
  if (!notes.length) {
    return (
      <div className="note-empty">
        <svg className="note-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m8.66-6.34l-.7.7M5.34 5.34l-.7.7m12.02.02l-.7-.7M5.34 18.66l-.7-.7M21 12h-1M4 12H3"
          />
        </svg>
        <p className="note-empty-text">Notes you add appear here</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard key={note.id} content={note.content} summary={note.summary} />
      ))}
    </div>
  );
}
