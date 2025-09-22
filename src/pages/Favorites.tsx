import MovieList from "../components/MovieList";
import { useFavorites } from "../context/FavoritesContextDefinition";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meus Filmes Favoritos</h1>

      {favorites.length > 0 ? (
        <MovieList movies={favorites} />
      ) : (
        <p className="text-gray-600 text-lg">
          Você ainda não adicionou nenhum filme aos favoritos. Comece a explorar
          e clique no ❤️!
        </p>
      )}
    </div>
  );
};

export default Favorites;
