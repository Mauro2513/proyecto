import React, { useContext } from 'react';
import { StoreContext } from '../../contexto/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({categoria, searchText}) => {


  const { foodList } = useContext(StoreContext);
  const filteredFoods = foodList.filter(food =>(
    (categoria === 'All' || food.categoria === categoria) &&
    food.nombre.toLowerCase().includes(searchText.toLowerCase())
  ));
  return (
    <div className="container">
      <div className="row">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food, index) => (
            <FoodItem key={index} 
              nombre={food.nombre}
              descripcion={food.descripcion}
              id={food.id}
              imageUrl={food.imageUrl}
              precio={food.precio}
              />
          ))
        ) : (
          <div className="text-center mt-4">
            <h4>No hay platos encontrados.</h4>
          </div>
        )}
      </div>
    </div>
  )
}

export default FoodDisplay;