import React, { useState } from 'react';
import FoodDisplay from '../../componentes/FoodDisplay/FoodDisplay';

const ExplorarComida = () => {
  const [categoria, setCategoria] = useState('All');
  const [searchText, setSearchText] = useState('');
  return (
    
    <> <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="input-group mb-3">
              <select className='form-select mt-2' style={{'maxWidth': '150px'}} onChange={(e) => setCategoria(e.target.value)}>
                <option value="All">Todas</option>
                <option value="hamburguesas">Hamburguesas</option>
                <option value="perros">Perros caliente</option>
                <option value="pizzas">Pizza</option>
                <option value="arabe">Arabe</option>
                <option value="salchipapas">Salchipapa</option>
                <option value="bebidas">Bebidas</option>
              </select>
              <input type='text' className='form-control mt-2' placeholder='Busca tu plato favorito...' 
              onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
              <button className='btn btn-primary mt-2' type='submit'>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FoodDisplay categoria={categoria} searchText={searchText}/>
    </>
  )
}

export default ExplorarComida;