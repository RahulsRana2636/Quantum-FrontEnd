import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ handleLogout }) => {
  const auth = localStorage.getItem('token');
  const navigate = useNavigate();
  const logout = () => {
    navigate('/login');
    handleLogout(); 
    localStorage.clear();
  };
  useEffect(() => {
    if (auth) {
      navigate('/dashboard');
    }
  }, []);
  return (

    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" >Quantum</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
       {
        auth ? <button className='btn btn-outline-danger me-2' type="submit" onClick={logout}>Logout</button>
        :
        
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Sign Up</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>  
}
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header
