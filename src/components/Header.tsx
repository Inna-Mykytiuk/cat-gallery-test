import { Link } from 'react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";

const Header = () => {
  return (
    <header className='w-full bg-gray-500 py-[20px] shadow-lg'>
      <div className='container'>
        <nav className='flex justify-between '>
          <Link to="/" className="text-white text-xl md:text-3xl font-bold ">Cat Gallery</Link>
          <Link to="/favorites" className="text-white text-xl font-bold flex items-center"><FaArrowCircleRight className="mr-2" /><p>Favorite Cats</p></Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
