import { useState, useEffect } from "react";
import { searchMovies } from "../services/api";
import type { Movie } from "../components/MovieCard";

export const useMovieSearch = (query: string, page: number) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      setIsLoading(false);
      setError(null);
      setTotalPages(1);
      return;
    }

    const fetchSearchedMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await searchMovies(query, page);
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

    fetchSearchedMovies();
    window.scrollTo(0, 0);
  }, [query, page]);

  return { movies, isLoading, error, totalPages };
};
