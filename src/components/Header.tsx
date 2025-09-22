import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Coluna da Esquerda */}
        <div className="flex-1">
          <Link to="/" className="text-xl font-bold">
            ReactFlix
          </Link>
        </div>

        {/* Coluna do Centro*/}
        <div className="flex-1 flex justify-center">
          <Link to="/" className="mr-4 hover:text-gray-300">
            Início
          </Link>
          <Link to="/favorites" className="hover:text-gray-300">
            Favoritos
          </Link>
        </div>

        {/* Coluna da Direita */}
        <div className="flex-1 flex justify-end">
          <SearchBar />
        </div>
      </nav>
    </header>
  );
};
export default Header;
