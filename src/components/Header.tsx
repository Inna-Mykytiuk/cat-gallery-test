import { FaArrowCircleRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="w-full bg-gray-500 py-[10px] shadow-lg">
      <div className="container">
        <nav className="flex justify-between">
          <Link
            to="/"
            className={`text-xl font-bold transition-all duration-300 ease-out md:text-3xl ${location.pathname === "/" ? "text-white hover:text-black/50" : "text-black/50 hover:text-white"}`}
          >
            Cat Gallery
          </Link>
          <Link
            to="/favorites"
            className={`flex items-center text-xl font-bold transition-all duration-300 ease-out ${location.pathname === "/favorites" ? "text-white hover:text-black/50" : "text-black/50 hover:text-white"}`}
          >
            <FaArrowCircleRight className="mr-2" />
            <p>Favorite Cats</p>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
