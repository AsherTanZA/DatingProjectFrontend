import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
              <div>
                <a href='http://localhost:5173' className='navbar-brand'>
                    Ash's Dating Platform
                </a>
              </div>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className='collapse navbar-collapse' id="navbarNav">
                
              </div>
              <ul className='navbar-nav'>
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
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent