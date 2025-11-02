import React from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";

const Header = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 mt-1 header">
        <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Pide tu comida favorita aqui!</h1>
            <p className="col-md-8 fs-4">Explora la mejor comida y bebidas en Cartagena.</p>
            <Link to="/Explorar" className='btn btn-primary'> Explorar </Link>
        </div>
    </div>
  )
}

export default Header;