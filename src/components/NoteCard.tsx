type NoteCardProps = {
    content: string;
    summary?: string;
  };
  
  export default function NoteCard({ content, summary }: NoteCardProps) {
    return (
      <div className="w-full max-w-xs bg-white rounded-xl shadow p-4 hover:shadow-md transition">
        <p className="text-sm text-gray-800 line-clamp-4">{content}</p>
        {summary && (
          <p className="text-xs text-gray-500 mt-2">
            <strong>Summary:</strong> {summary}
          </p>
        )}
      </div>
    );
  }
  