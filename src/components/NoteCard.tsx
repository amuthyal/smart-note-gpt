import { useState } from "react";
import NoteModal from "./NoteModal";
import "./NoteCard.css";

type NoteCardProps = {
  id: string;
  title?: string;
  content: string;
  summary?: string;
  onSave: (id: string, updatedContent: string, updatedSummary?: string) => void;
  onSummarize: (id: string, content: string) => void;
};

export default function NoteCard({
  id,
  title,
  content,
  summary,
  onSave,
  onSummarize,
}: NoteCardProps) {
  const [openModal, setOpenModal] = useState(false);

  const preview = content.length > 150 ? content.slice(0, 150) + "..." : content;

  return (
    <>
      <div className="note-card" onClick={() => setOpenModal(true)}>
        {title && <h4 className="note-title">{title}</h4>}
        <p className="note-preview">{preview}</p>
        {summary && (
          <p className="note-summary">
            <strong>Summary:</strong> {summary}
          </p>
        )}
      </div>

      {openModal && (
        <NoteModal
          id={id}
          content={content}
          summary={summary}
          onClose={() => setOpenModal(false)}
          onUpdateNote={onSave}
        />
      )}
    </>
  );
}
