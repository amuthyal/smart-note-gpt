import NoteCard from "./NoteCard";

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
      <div className="flex flex-col items-center justify-center text-gray-400 mt-16">
        <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-6.34l-.7.7M5.34 5.34l-.7.7m12.02.02l-.7-.7M5.34 18.66l-.7-.7M21 12h-1M4 12H3" />
        </svg>
        <p className="text-sm">Notes you add appear here</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} content={note.content} summary={note.summary} />
      ))}
    </div>
  );
}
