import React, { useEffect, useState } from "react";
import { fetchAllOrders, updateOrderStatus } from "../../servicios/orderService";
import { toast } from "react-toastify";

const Orders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchAllOrders();
      console.log("Orders received:", response); // Para ver la estructura
      setData(response || []);
    } catch (error) {
      console.error("Error al cargar los pedidos:", error);
      setError("No es posible cargar los pedidos");
      toast.error("No es posible mostrar los pedidos. Intente de nuevo.");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (event, orderId) => {
    try {
      const success = await updateOrderStatus(orderId, event.target.value);
      if (success) {
        toast.success("Estado de la orden actualizado exitosamente");
        await fetchOrders();
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
      toast.error("Error al actualizar el estado:");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando ordenes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <button className="btn btn-primary" onClick={fetchOrders}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="py-5 row justify-content-center">
        <div className="col-11">
          <h2 className="mb-4">Panel de pedidos</h2>
          {data.length === 0 ? (
            <div className="card p-4 text-center">
              <p className="mb-0">No hay pedidos encontrados</p>
            </div>
          ) : (
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th></th>
                      <th>Detalles de las ordenes</th>
                      <th>Valor</th>
                      <th>Items</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((order, index) => {
                      // Determina el monto correcto
                      const amount = order.amount || order.cuenta || order.total || 0;
                      
                      // Determina los items
                      const items = order.orderedItems || order.items || order.orderItems || [];
                      
                      // Determina la dirección
                      const address = order.userAddress || order.address || order.direccion || "No hay direccion";
                      
                      // Determina el estado
                      const status = order.orderStatus || order.status || order.estado || "En preparacion";

                      return (
                        <tr key={order.id || index}>
                          <td style={{width: '60px'}}>
                            <div 
                              style={{
                                width: '48px', 
                                height: '48px', 
                                backgroundColor: '#e9ecef', 
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                borderRadius: '8px',
                                fontSize: '24px'
                              }}
                            >
                              📦
                            </div>
                          </td>
                          <td>
                            <div className="mb-1">
                              <strong>Pedido #{order.id}</strong>
                            </div>
                            <div className="mb-2">
                              {items.length > 0 ? (
                                items.map((item, idx) => {
                                  const itemName = item.name || item.nombrePlato || item.nombre || "Unknown item";
                                  const itemQty = item.quantity || item.cantidad || 1;
                                  
                                  if (idx === items.length - 1) {
                                    return itemName + " x " + itemQty;
                                  } else {
                                    return itemName + " x " + itemQty + ", ";
                                  }
                                })
                              ) : (
                                <span className="text-muted">No items</span>
                              )}
                            </div>
                            <div className="text-muted small">
                              📍 {address}
                            </div>
                          </td>
                          <td>
                            <strong>${Number(amount).toFixed(0)}</strong>
                          </td>
                          <td>
                            <span className="badge bg-secondary">
                              {items.length} {items.length === 1 ? 'item' : 'items'}
                            </span>
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              onChange={(event) => updateStatus(event, order.id)}
                              value={status}
                            >
                              <option value="En preparacion">En preparacion</option>
                              <option value="Salio a entrega">Salio a entrega</option>
                              <option value="Entregado">Entregado</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;