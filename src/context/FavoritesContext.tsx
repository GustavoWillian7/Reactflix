import { useState, type ReactNode, useEffect } from "react";
import type { Movie } from "../components/MovieCard";
import {
  FavoritesContext,
  type FavoritesContextType,
} from "./FavoritesContextDefinition";

interface FavoritesProviderProps {
  children: ReactNode;
}

const FAVORITES_STORAGE_KEY = "reactflix:favorites";

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    try {
      const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (savedFavorites) {
        return JSON.parse(savedFavorites);
      }
    } catch (error) {
      console.error("Falha ao carregar favoritos do localStorage:", error);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Falha ao salvar favoritos no localStorage:", error);
    }
  }, [favorites]);

  const addFavorite = (movie: Movie) => {
    if (!isFavorite(movie.id)) {
      setFavorites((currentFavorites) => [...currentFavorites, movie]);
    }
  };

  const removeFavorite = (movieId: number) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value: FavoritesContextType = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
