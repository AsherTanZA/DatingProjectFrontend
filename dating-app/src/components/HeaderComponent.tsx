import React from 'react'

const HeaderComponent = () => {
  return (
    <div>
        <header>
            <nav className='navbar navbar-dark bg-dark fixed-top' style={{paddingLeft: "20px"}}>
                <a className="navbar-brand" href="#"> Ash's Dating Platform</a>
            </nav>
        </header>
    </div>
  )
}

export default HeaderComponent