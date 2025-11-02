import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Sidebar = ({sidebarVisible}) => {
  return (
<div className={`border-end bg-white ${sidebarVisible ?'':'d-none'}`} id="sidebar-wrapper">
    <div className="sidebar-heading border-bottom bg-light">
        <img src={assets.logo}alt="" height={48} width={48}/>
    </div>
    <div className="list-group list-group-flush">
        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/agregar">
        <i className='bi bi-plus-circle me-2'></i>Agregar comida</Link>
        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/lista">
         <i className='bi bi-list-ul me-2'></i>Lista de comidas</Link>
        <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/ordenes">
         <i className='bi bi-cart me-2'></i>Ordenes</Link>
         <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/calificaciones"><i className="bi bi-star-fill me-2"></i>Calificaciones</Link>
                    
    </div>
</div>
  )
}

export default Sidebar;