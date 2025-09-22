import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const EXCLUDED_GENRE_IDS = [].join(",");

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "pt-BR",
    include_adult: false,
  },
});

export interface Genre {
  id: number;
  name: string;
}

interface VideoResult {
  key: string;
  site: string;
  type: string;
}

export const searchMovies = async (query: string, page: number) => {
  try {
    const response = await api.get("/search/movie", {
      params: {
        query,
        page: page,
        "vote_count.gte": 100,
        without_genres: EXCLUDED_GENRE_IDS,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw new Error(
      "Não foi possível buscar filmes. Tente novamente mais tarde."
    );
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await api.get("/movie/popular");
    return response.data.results;
  } catch (error) {
    console.error("Erro ao buscar filmes populares:", error);
    throw new Error(
      "Não foi possível buscar os filmes populares. Tente novamente mais tarde."
    );
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar detalhes do filme:", error);
    throw new Error(
      "Não foi possível buscar detalhes do filme. Tente novamente mais tarde."
    );
  }
};

export const getGenres = async (): Promise<Genre[]> => {
  try {
    const response = await api.get("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Erro ao buscar gêneros:", error);
    throw new Error("Não foi possível buscar a lista de gêneros.");
  }
};

export const discoverMovies = async (
  sortBy: string,
  genreId: string | undefined,
  page: number
) => {
  try {
    const params: { [key: string]: string | number } = {
      sort_by: sortBy,
      page: page,
      "vote_count.gte": 100,
      without_genres: EXCLUDED_GENRE_IDS,
    };
    if (genreId) {
      params.with_genres = genreId;
    }

    const response = await api.get("/discover/movie", { params });
    return response.data;
  } catch (error) {
    console.error("Erro ao descobrir filmes:", error);
    throw new Error("Não foi possível realizar a busca. Tente novamente.");
  }
};

export const getMovieVideos = async (id: string) => {
  try {
    const response = await api.get(`/movie/${id}/videos`);
    const videos: VideoResult[] = response.data.results;

    const trailer = videos.find(
      (video: VideoResult) =>
        video.site === "YouTube" && video.type === "Trailer"
    );

    return trailer ? trailer.key : videos.length > 0 ? videos[0].key : null;
  } catch (error) {
    console.error("Erro ao buscar vídeos do filme:", error);
    throw new Error("Não foi possível buscar os vídeos do filme.");
  }
};

export default api;
