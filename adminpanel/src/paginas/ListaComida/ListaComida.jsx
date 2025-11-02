import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import './ListaComida.css';
import { deleteFood, getFoodList } from '../../servicios/comidaServicio';

const ListaComida = () => {
  const [list, setList] = useState([]);
  const obtenerLista = async() => {
    try {
      const data = await getFoodList();
      setList(data);
    } catch (error) {
      toast.error('Error al mostrar la lista de comidas.');
    }
      
  }

  const eliminarComida = async(comidaId) => {
    
    try {
      const exito = await deleteFood(comidaId);
      if(exito) {
        toast.success('Comida eliminada.');
        await obtenerLista();
      } else {
        toast.error('Error al eliminar la comida.');
      }
    } catch (error) {
      toast.error('Error al eliminar la comida.');
    }
  }
    
useEffect(() => {
  obtenerLista();
}, []);
  return (
    <div className="py-5 row.justify-content-center">
      <div className="col-11 card">
        <table className='table'>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img src={item.imageUrl} alt="" height={48} width={48}/>
                  </td>
                  <td>{item.nombre}</td>
                  <td>{item.categoria}</td>
                  <td>${item.precio}</td>
                  <td className='text-danger'>
                    <i className='bi bi-x-circle-fill' onClick={() => eliminarComida(item.id)}></i>
                  </td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListaComida;