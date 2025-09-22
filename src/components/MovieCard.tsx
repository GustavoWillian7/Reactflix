import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContextDefinition";
import { IMAGE_BASE_URL } from "../constants";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const favorited = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="relative bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 z-10 p-1.5 bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition-colors"
          title={
            favorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"
          }
        >
          {favorited ? (
            <span className="text-red-500 text-xl">❤️</span>
          ) : (
            <span className="text-white text-xl">🤍</span>
          )}
        </button>

        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold truncate">{movie.title}</h3>
          <p className="text-gray-600">Nota: {movie.vote_average.toFixed(1)}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
