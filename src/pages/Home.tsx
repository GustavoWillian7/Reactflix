import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import type { Movie } from "../components/MovieCard";
import { discoverMovies, getGenres, type Genre } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import FilterControls from "../components/FilterControls";
import PaginationControls from "../components/PaginationControls";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreResults = await getGenres();
        setGenres(genreResults);
      } catch (err) {
        console.error("Falha ao buscar gêneros:", err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await discoverMovies(sortBy, selectedGenre, currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Um erro inesperado ocorreu.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
    window.scrollTo(0, 0);
  }, [sortBy, selectedGenre, currentPage]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (value: string) => {
      setter(value);
      setCurrentPage(1);
    };

  return (
    <div>
      <section className="bg-gray-800 text-white rounded-lg p-8 md:p-12 mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Descubra Filmes Incríveis
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Explore, filtre e ordene nosso catálogo como desejar!
        </p>
      </section>

      <FilterControls
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleFilterChange(setSelectedGenre)}
        sortBy={sortBy}
        onSortChange={handleFilterChange(setSortBy)}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : movies.length > 0 ? (
        <>
          <MovieList movies={movies} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>Nenhum filme encontrado com os filtros selecionados.</p>
      )}
    </div>
  );
};

export default Home;
