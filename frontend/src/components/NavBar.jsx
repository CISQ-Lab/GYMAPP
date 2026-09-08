import logo from '../assets/logo.jpg';
import { NavLink } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { SERVER_URL } from '../config/env';

import useGym from '../hooks/useGym';

function Navbar({ sidebarMinimized, onToggle }) {

  const { logout } = useAuth();
  const {gym} = useGym();

  return (

    <nav className={`flex justify-between items-center p-5 bg-primary text-white h-15 `}>
      <div className="flex items-center space-x-3">
        <button onClick={onToggle} className="p-2 ml-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white">
          <svg xmlns="http://www.w3.org/2000/svg" height="24"
            viewBox="0 0 24 24" width="24" fill="white">
            <path d="M20 5H4a1 1 0 000 2h16a1 1 0 100-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Z"></path>
          </svg>
        </button>
        <div className={`flex items-center`}>
          <img src={SERVER_URL + gym?.logo_path} alt="Gym App Logo" className="h-15 w-15 rounded-full" />
          <h1 className='ml-3 text-center'>{gym?.name}</h1>

        </div>
      </div>


      <ul className="flex space-x-4">
        <li><button onClick={logout} className='p-5 bg-amber-400'>Logout</button></li>
        
      </ul>


    </nav>
  );
}

export default Navbar;