import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Calificaciones.css';

const Calificaciones = () => {
  const [calificaciones, setCalificaciones] = useState([]);
  const [estadisticas, setEstadisticas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // todas, 5, 4, 3, 2, 1

  useEffect(() => {
    cargarCalificaciones();
    cargarEstadisticas();
  }, []);

  const cargarCalificaciones = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/calificaciones');
      setCalificaciones(response.data);
    } catch (error) {
      toast.error('Error al cargar calificaciones');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/calificaciones/estadisticas');
      setEstadisticas(response.data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const eliminarCalificacion = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta calificación?')) {
      try {
        await axios.delete(`http://localhost:8080/api/calificaciones/${id}`);
        toast.success('Calificación eliminada');
        cargarCalificaciones();
        cargarEstadisticas();
      } catch (error) {
        toast.error('Error al eliminar');
        console.error('Error:', error);
      }
    }
  };

  const renderEstrellas = (puntuacion) => {
    return [...Array(5)].map((_, index) => (
      <i
        key={index}
        className={`bi bi-star${index < puntuacion ? '-fill' : ''}`}
        style={{ color: index < puntuacion ? '#ffc107' : '#ddd' }}
      ></i>
    ));
  };

  const calificacionesFiltradas = filtro === 'todas' 
    ? calificaciones 
    : calificaciones.filter(c => c.puntuacion === parseInt(filtro));

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="calificaciones-container">
      <div className="calificaciones-header">
        <h2>
          <i className="bi bi-star-fill text-warning me-2"></i>
          Calificaciones de Clientes
        </h2>
      </div>

      {/* Estadísticas */}
      {estadisticas && (
        <div className="estadisticas-grid">
          <div className="stat-card total">
            <div className="stat-icon">
              <i className="bi bi-clipboard-data"></i>
            </div>
            <div className="stat-content">
              <h3>{estadisticas.total}</h3>
              <p>Total Calificaciones</p>
            </div>
          </div>

          <div className="stat-card promedio">
            <div className="stat-icon">
              <i className="bi bi-star-fill"></i>
            </div>
            <div className="stat-content">
              <h3>{estadisticas.promedio.toFixed(1)}</h3>
              <p>Promedio General</p>
              <div className="stars-small">
                {renderEstrellas(Math.round(estadisticas.promedio))}
              </div>
            </div>
          </div>

          <div className="stat-card distribucion">
            <div className="stat-icon">
              <i className="bi bi-bar-chart-fill"></i>
            </div>
            <div className="stat-content">
              <p>Distribución</p>
              <div className="distribucion-bars">
                {[5, 4, 3, 2, 1].map(star => (
                  <div key={star} className="bar-item">
                    <span>{star}★</span>
                    <div className="bar-bg">
                      <div 
                        className="bar-fill" 
                        style={{ 
                          width: `${(estadisticas.porPuntuacion[star] / estadisticas.total) * 100}%` 
                        }}
                      ></div>
                    </div>
                    <span>{estadisticas.porPuntuacion[star]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="filtros-container">
        <button 
          className={`btn-filtro ${filtro === 'todas' ? 'active' : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
        {[5, 4, 3, 2, 1].map(star => (
          <button 
            key={star}
            className={`btn-filtro ${filtro === star.toString() ? 'active' : ''}`}
            onClick={() => setFiltro(star.toString())}
          >
            {star} ★
          </button>
        ))}
      </div>

      {/* Lista de Calificaciones */}
      <div className="calificaciones-list">
        {calificacionesFiltradas.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <p>No hay calificaciones {filtro !== 'todas' ? `de ${filtro} estrellas` : ''}</p>
          </div>
        ) : (
          calificacionesFiltradas.map((cal) => (
            <div key={cal.id} className="calificacion-card">
              <div className="cal-header">
                <div className="cal-user-info">
                  <div className="user-avatar">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <div>
                    <h4>{cal.nombre} {cal.apellido}</h4>
                    <p className="cal-fecha">
                      <i className="bi bi-clock"></i> {formatearFecha(cal.fechaCreacion)}
                    </p>
                  </div>
                </div>
                <div className="cal-rating">
                  {renderEstrellas(cal.puntuacion)}
                  <span className="rating-number">{cal.puntuacion}/5</span>
                </div>
              </div>

              <div className="cal-body">
                <p className="cal-experiencia">{cal.experiencia}</p>
              </div>

              <div className="cal-footer">
                <div className="cal-contact">
                  <span>
                    <i className="bi bi-telephone"></i> {cal.telefono}
                  </span>
                </div>
                <button 
                  className="btn-eliminar"
                  onClick={() => eliminarCalificacion(cal.id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Calificaciones;