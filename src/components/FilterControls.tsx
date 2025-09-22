import type { Genre } from "../services/api";

interface FilterControlsProps {
  genres: Genre[];
  selectedGenre: string;
  onGenreChange: (genreId: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const FilterControls = ({
  genres,
  selectedGenre,
  onGenreChange,
  sortBy,
  onSortChange,
}: FilterControlsProps) => {
  const sortOptions = [
    { value: "popularity.desc", label: "Mais Populares" },
    { value: "release_date.desc", label: "Mais Recentes" },
    { value: "vote_average.desc", label: "Melhores Avaliados" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1">
        <label
          htmlFor="sort-by"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Ordenar por
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1">
        <label
          htmlFor="genre"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Filtrar por Gênero
        </label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
        >
          <option value="">Todos os Gêneros</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
