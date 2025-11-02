import React, { useState } from 'react';
import Header from '../../componentes/Header/Header';
import ExplorarMenu from '../../componentes/ExplorarMenu/ExplorarMenu';
import FoodDisplay from '../../componentes/FoodDisplay/FoodDisplay';

const Home = () => {
  const [categoria, setCategoria] = useState('All');
  return (
    <main className='container'>
      <Header />
      <ExplorarMenu categoria={categoria} setCategoria={setCategoria} />
      <FoodDisplay categoria={categoria} searchText={''}/>
    </main>
  )
}

export default Home;