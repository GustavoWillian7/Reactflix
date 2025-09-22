import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails, getMovieVideos } from "../services/api";
import { useFavorites } from "../context/FavoritesContextDefinition";
import { IMAGE_BASE_URL } from "../constants";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "react-modal";

interface MovieDetail {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;

    const fetchAllDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [movieData, videoKey] = await Promise.all([
          getMovieDetails(id),
          getMovieVideos(id),
        ]);

        setMovie(movieData);
        setTrailerKey(videoKey);
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
    fetchAllDetails();
  }, [id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  if (!movie) {
    return <p className="text-center text-xl mt-8">Filme não encontrado.</p>;
  }

  const favorited = isFavorite(movie.id);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
      >
        &larr; Voltar
      </button>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-lg w-full md:w-1/3 object-cover"
        />
        <div className="md:w-2/3">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-4xl font-bold">{movie.title}</h1>

            <button
              onClick={() => {
                if (favorited) {
                  removeFavorite(movie.id);
                } else {
                  addFavorite({
                    id: movie.id,
                    title: movie.title,
                    poster_path: movie.poster_path,
                    vote_average: movie.vote_average,
                  });
                }
              }}
              className={`py-2 px-4 rounded-lg font-semibold transition-colors flex-shrink-0 ${
                favorited
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {favorited ? "Desfavoritar" : "Favoritar"}
            </button>
          </div>

          <p className="text-gray-500 mb-4">
            Lançamento:{" "}
            {new Date(movie.release_date).toLocaleDateString("pt-BR")}
          </p>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 font-bold text-xl mr-2">★</span>
            <span className="text-2xl font-bold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="mb-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 inline-block"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {trailerKey && (
            <div className="mt-6">
              <button
                onClick={openModal}
                className="bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z"
                    clipRule="evenodd"
                  />
                </svg>
                Assistir ao Trailer
              </button>
            </div>
          )}

          <h2 className="text-2xl font-semibold mb-2 mt-6">Sinopse</h2>
          <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Trailer do Filme"
        className="relative bg-black w-full max-w-4xl mx-auto my-12 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <div
          className="relative"
          style={{ paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Trailer do Filme"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        <button
          onClick={closeModal}
          className="absolute -top-10 right-0 text-white text-3xl font-bold"
        >
          &times;
        </button>
      </Modal>
    </div>
  );
};

export default MovieDetails;
