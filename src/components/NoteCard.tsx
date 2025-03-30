import "./NoteCard.css";

type NoteCardProps = {
  content: string;
  summary?: string;
};

export default function NoteCard({ content, summary }: NoteCardProps) {
  return (
    <div className="note-card">
      <p className="note-content">{content}</p>
      {summary && (
        <p className="note-summary">
          <strong>Summary:</strong> {summary}
        </p>
      )}
    </div>
  );
}
