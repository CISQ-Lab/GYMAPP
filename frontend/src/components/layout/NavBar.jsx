import ClockIcon from '../../assets/icons/ClockIcon';
import { useEffect, useState } from 'react';

import useGym from '../../hooks/useGym';
import useCD from '../../hooks/useCD';
import Button from '../buttons/button';
import { NavLink } from 'react-router-dom';
import showError from '../messages/showError.js';
import { apiFetch } from '../../services/api.jsx';
import Success from '../messages/success';

function Navbar() {
  const { gym } = useGym();

  const [date, setDate] = useState(new Date());
  const { cashDrawer, setCashDrawer } = useCD();
  
  const createCashDrawer = async () => {

    try {

      const data = await apiFetch("/cashDrawer/createCashDrawer", {
        method: 'PUT',
        body: JSON.stringify({
          gymId: gym?.id
        })
      }
      )

      if (data.success) {
        Success(data.message);
        const data2 = await apiFetch(`/cashdrawer/getcashdrawer?gymId=${gym?.id}`)
        data2.success ? setCashDrawer(data2.caja) : window.location.reload()
        
      }

    } catch (error) {
      showError(error.message);
    }

  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  return (

    <nav className={`flex justify-between items-center text-black h-10 px-10 mt-5`}>

      <div className=''>
        <h1 className=' text-center'>{gym?.name}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <ClockIcon />
        <p className="ml-2 mr-2">{date.toLocaleDateString() + " - " + date.toLocaleTimeString()}</p>
        <div className='ml-3'>
          {!cashDrawer ? <Button onClick={createCashDrawer}>Abrir Caja</Button> :
          <NavLink to="/closeturn">
              <Button>Cerrar Caja</Button>
          </NavLink>
             }
        </div>
      </div>



    </nav>
  );
}

export default Navbar;