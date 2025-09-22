import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <div className="flex flex-col min-h-screen bg-slate-100 text-slate-800">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </FavoritesProvider>
  );
}

export default App;
