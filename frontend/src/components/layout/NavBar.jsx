import ClockIcon from '../../assets/icons/ClockIcon';
import { useEffect, useState } from 'react';

import useGym from '../../hooks/useGym';

function Navbar({ sidebarMinimized, onToggle }) {
  const { gym } = useGym();

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (

    <nav className={`flex justify-between items-center text-black h-15 mb-5`}>

      <div className=''>
        <h1 className=' text-center'>{gym?.name}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <ClockIcon />
        <p className="ml-2 ">{date.toLocaleDateString() + " - " + date.toLocaleTimeString()}</p>
      </div>


    </nav>
  );
}

export default Navbar;