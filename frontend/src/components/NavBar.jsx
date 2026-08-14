import logo from '../assets/hero.png';

function Navbar({ sidebarMinimized, onToggle }) {
  return (

    <nav className="flex justify-between items-center px-5 bg-gray-800 text-white">
      <button onClick={onToggle}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24"
          viewBox="0 0 24 24" width="24" fill="white">
          <path d="M20 5H4a1 1 0 000 2h16a1 1 0 100-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Z"></path>
        </svg>
      </button>
      <div className="flex items-center space-x-5">
        <img src={logo} alt="Gym App Logo" className="h-10 w-10" />
        <h1>Gym App</h1>
      </div>


      <ul className="flex space-x-4">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>


    </nav>
  );
}

export default Navbar;