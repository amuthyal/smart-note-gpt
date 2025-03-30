type SearchBarProps = {
    query: string;
    onChange: (val: string) => void;
    onSearch: () => void;
    loading: boolean;
  };
  
  export default function SearchBar({ query, onChange, onSearch, loading }: SearchBarProps) {
    return (
      <div className="w-full max-w-xl mx-auto mt-4 flex gap-2">
        <input
          type="text"
          placeholder="Search notes with AI..."
          className="flex-grow px-4 py-2 rounded-full shadow-inner bg-gray-100 focus:outline-none text-sm"
          value={query}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          onClick={onSearch}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm transition"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    );
  }
  