import { useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList";
import { useMovieSearch } from "../hooks/useMovieSearch";
import LoadingSpinner from "../components/LoadingSpinner";
import PaginationControls from "../components/PaginationControls";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { movies, isLoading, error, totalPages } = useMovieSearch(
    query,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setSearchParams({ query, page: page.toString() });
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <p className="text-center text-red-500 text-lg">{error}</p>;
    }

    if (movies.length > 0) {
      return (
        <>
          <MovieList movies={movies} />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      );
    }

    if (query && movies.length === 0) {
      return <p>Nenhum filme encontrado para sua busca.</p>;
    }

    return null;
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Resultados para: <span className="text-gray-600">"{query}"</span>
      </h1>
      {renderContent()}
    </div>
  );
};

export default SearchPage;
