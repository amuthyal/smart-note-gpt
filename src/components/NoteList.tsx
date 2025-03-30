import NoteCard from "./NoteCard";

type Note = {
  id: string;
  content: string;
  summary?: string;
};

type NoteListProps = {
  notes: Note[];
  onSave: (id: string, updatedContent: string) => void;
  onSummarize: (id: string, content: string) => void;
};

export default function NoteList({ notes, onSave, onSummarize }: NoteListProps) {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          id={note.id}
          content={note.content}
          summary={note.summary}
          onSave={onSave}
          onSummarize={onSummarize}
        />
      ))}
    </div>
  );
}
