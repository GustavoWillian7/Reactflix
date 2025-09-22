import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (query.trim()) {
      navigate(`/search?query=${query}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar por um filme..."
        className="px-4 py-2 rounded-1-md text-gray-800 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-gray-700 text-white px-4 py-2 rounded-r-md hover:bg-gray-600 transition-colors"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
