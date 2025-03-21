import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isUserLoggedIn, logout, gettheUsername } from '../services/AuthService';

const HeaderComponent = () => {

  const [theusername, setTheUsername] = useState<string | null>(null);

  const isAuth = isUserLoggedIn();

  //const theusername = gettheUsername(sessionStorage.getItem("authenticatedUser"));


  const navigator = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      const email = sessionStorage.getItem("authenticatedUser");
      if (email) {
        const username = await gettheUsername(email);
        setTheUsername(username);
      }
    };

    if (isAuth) {
      fetchUsername();
    }
  }, [isAuth]);

  function handleLogout(){
    logout();
    navigator('/login');
  }

  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
              <div>{isAuth &&  <a className='navbar-brand'>
                    Welcome {theusername}
                </a> }
                {!isAuth &&  <a href='http://localhost:5173' className='navbar-brand'>
                    Ash's Dating Platform
                </a> }
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className='collapse navbar-collapse' id="navbarNav">
                <ul className='navbar-nav'>
                  {
                    isAuth &&
                    <li className='nav-item'>
                      <NavLink to="/attendees" className="nav-link">Attendees</NavLink>
                    </li>
                  }
                </ul>
              </div>
              <ul className='navbar-nav'>
                {
                  !isAuth &&
                  <li className='nav-item'>
                        <NavLink 
                          to="/register" 
                          className={({ isActive }) => 
                            isActive ? "nav-link active" : "nav-link"
                          }
                        >
                          Register
                        </NavLink>
                    </li>
                }
                {
                  !isAuth &&
                  <li className='nav-item'>
                        <NavLink 
                          to="/login" 
                          className={({ isActive }) => 
                            isActive ? "nav-link active" : "nav-link"
                          }
                        >
                          Login
                        </NavLink>
                  </li>
                } 
                {
                  isAuth &&
                  <li className='nav-item'>
                        <NavLink 
                          to="/login" 
                          className={({ isActive }) => 
                            isActive ? "nav-link active" : "nav-link"
                          }
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                  </li>
                } 
              </ul>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent