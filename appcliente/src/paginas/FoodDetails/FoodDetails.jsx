import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchFoodDetails } from '../../servicio/comidaServicio';
import { toast } from 'react-toastify';
import { StoreContext } from '../../contexto/StoreContext';

const FoodDetails = () => {
    const {id} = useParams();
    const {increaseQty} = useContext(StoreContext)
    const navigate = useNavigate();

    const [data, setData] = useState({});
    

    useEffect(() => {
        const loadFoodDetails = async () => {
            try {
                const foodData = await fetchFoodDetails(id);
                setData(foodData);
            } catch (error) {
                toast.error('Error al mostrar los detalles del plato');
            }
        }
        loadFoodDetails();
    }, [id]);

    const addToCart  = () => {
        increaseQty(data.id);
        navigate('/cart');


    }
  return (
    <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={data.imageUrl} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="fs-5 mb-1">Categoria: <span className='badge text-bg-warning'>{data.categoria}</span></div>
                        <h1 className="display-5 fw-bolder">{data.nombre}</h1>
                        <div className="fs-5 mb-2">
                            <span>${data.precio}</span>
                        </div>
                        <p className="lead">{data.descripcion}</p>
                        <div className="d-flex">
                            <button className="btn btn-outline-dark flex-shrink-0" type="button"onClick={addToCart}>
                                <i className="bi-cart-fill me-1"></i>
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default FoodDetails;