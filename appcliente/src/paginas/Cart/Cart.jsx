import React, { useContext } from 'react';
import { StoreContext } from '../../contexto/StoreContext';
import './Cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { calcularSubtotal } from '../../utilidades/cartUtils';

const Cart = () => {
    const navigate = useNavigate();
    const {foodList, increaseQty, decreaseQty, quantities, removeFromCart} 
    = useContext(StoreContext);
    // carrito de compras
    const cartItems = foodList.filter(food => quantities[food.id] > 0);

    //calculo
    const {subtotal, shipping, tax, total} = calcularSubtotal(
        cartItems, 
        quantities
    );

  return (
    <div className="container py-5">
    <h1 className="mb-5">Tu pedido</h1>
    <div className="row">
        <div className="col-lg-8">
           {
            cartItems.length === 0 ? (
                <p>Tu carrito esta vacio.</p>
            ) : (
                 <div className="card mb-4">
                <div className="card-body">
                    {cartItems.map((food) => (
                        <div key={food.id} className="row cart-item mb-3">
                        <div className="col-md-3">
                            <img 
                            src={food.imageUrl} 
                            alt={food.name} 
                            className="img-fluid rounded"
                            width={100}
                            />
                        </div>
                        <div className="col-md-5">
                            <h5 className="card-title">{food.nombre}</h5>
                            <p className="text-muted">Categoria: {food.categoria}</p>
                        </div>
                        <div className="col-md-2">
                            <div className="input-group">
                                <button 
                                className="btn btn-outline-secondary btn-sm" 
                                type="button"
                                onClick={()=> decreaseQty(food.id)}
                                >-
                                </button>
                                <input 
                                style={{"maxWidth":"100px"}} 
                                type="text" 
                                className="form-control  form-control-sm text-center quantity-input"
                                value={quantities[food.id]}
                                readOnly
                                />
                                <button 
                                className="btn btn-outline-secondary btn-sm" 
                                type="button"
                                onClick={()=> increaseQty(food.id)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="col-md-2 text-end">
                            <p className="fw-bold">${(food.precio * quantities[food.id]).toFixed(0)}</p>
                            <button className="btn btn-sm btn-outline-danger" onClick={()=> removeFromCart(food.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                        </div>
                        <hr />
                    </div>
                    ))}
                    
                </div>
            </div>
            )
           }

            <div className="text-start mb-4">
                <Link to="/" className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>Continuar comprando
                </Link>
            </div>
        </div>
        <div className="col-lg-4">

            <div className="card cart-summary">
                <div className="card-body">
                    <h5 className="card-title mb-4">Resumen de la compra</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(0)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Domicilio</span>
                        <span>${subtotal=== 0 ? 0.0 :shipping.toFixed(0)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Impuesto</span>
                        <span>${tax.toFixed(0)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                        <strong>Total</strong>
                        <strong>${subtotal === 0 ?0.0 : total.toFixed(0)}</strong>
                    </div>
                    <button 
                    className="btn btn-primary w-100" 
                    disabled={cartItems.length === 0}
                    onClick={()=> navigate('/order')}
                    >
                    Hacer pedido!
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
  );
};

export default Cart;