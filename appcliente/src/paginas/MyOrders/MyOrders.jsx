import React, { useEffect, useState, useContext } from "react";
import { StoreContext } from "../../contexto/StoreContext";
import { assets } from "../../assets/assets";
import "./MyOrders.css";
import { fetchUserOrders } from "../../servicio/orderService";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchUserOrders(token);
      console.log("Órdenes recibidas:", response);
      setData(response || []);
    } catch (error) {
      console.error("Error al cargar órdenes:", error);
      setError("No se pudieron cargar las órdenes. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3">Cargando tus pedidos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
          <button 
            className="btn btn-sm btn-outline-danger ms-3" 
            onClick={fetchOrders}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11 card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3 className="mb-0">Mis Pedidos</h3>
            <button 
              className="btn btn-sm btn-warning" 
              onClick={fetchOrders}
              title="Actualizar"
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
          {data.length === 0 ? (
            <div className="card-body text-center py-5">
              <i className="bi bi-bag-x" style={{ fontSize: "3rem", color: "#ccc" }}></i>
              <h5 className="mt-3">No tienes pedidos aún</h5>
              <p className="text-muted">Cuando realices un pedido, aparecerá aquí</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead>
                  <tr>
                    <th></th>
                    <th>Productos</th>
                    <th>Total</th>
                    <th>Items</th>
                    <th>Estado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order, index) => (
                    <tr key={order.id || index}>
                      <td>
                        <img
                          src={assets.delivery}
                          alt="delivery"
                          height={48}
                          width={48}
                        />
                      </td>
                      <td>
  {order.orderedItems?.map((item, idx) => {
    if (idx === order.orderedItems.length - 1) {
      return `${item.nombre || item.name} x ${item.cantidad || item.quantity}`;  // ✅ Cambiado
    } else {
      return `${item.nombre || item.name} x ${item.cantidad || item.quantity}, `;  // ✅ Cambiado
    }
  }).join('') || 'Sin items'}
</td>
<td className="fw-bold">${order.cuenta?.toFixed(2) || '0.00'}</td>  {/* ✅ Cambiado de amount a cuenta */}
<td>Items: {order.orderedItems?.length || 0}</td>
<td>
  <span className="badge bg-warning text-dark text-capitalize">
    {order.estado || 'Pendiente'}  {/* ✅ Cambiado de orderStatus a estado */}
  </span>
</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => console.log('Ver detalles:', order)}
                          title="Ver detalles"
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;