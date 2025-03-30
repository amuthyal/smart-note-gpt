import "./SearchBar.css";

type SearchBarProps = {
  query: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  loading: boolean;
};

export default function SearchBar({
  query,
  onChange,
  onSearch,
  loading,
}: SearchBarProps) {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        placeholder="Search notes with AI..."
        className="searchbar-input"
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSearch} className="searchbar-button">
        {loading ? "Searching..." : "Search"}
      </button>
    </div>
  );
}
