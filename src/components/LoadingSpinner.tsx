const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        className="w-12 h-12 border-4 border-gray-300 border-t-gra-800 rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Carregando...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
