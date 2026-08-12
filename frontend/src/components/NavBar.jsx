import logo from '../assets/hero.png';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-5 bg-gray-800 text-white">
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