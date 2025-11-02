import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './CalificacionModal.css';

const CalificacionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    puntuacion: 5,
    experiencia: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/calificaciones', formData);
      
      if (response.data.success) {
        toast.success('¡Gracias por tu calificación! 🌟');
        setIsOpen(false);
        setFormData({
          nombre: '',
          apellido: '',
          telefono: '',
          puntuacion: 5,
          experiencia: ''
        });
      }
    } catch (error) {
      toast.error('Error al enviar la calificación. Intenta de nuevo.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón Flotante */}
      <button 
        className="btn-calificar-flotante"
        onClick={() => setIsOpen(true)}
        title="Califica tu experiencia"
      >
        <i className="bi bi-star-fill"></i>
        <span>Califícanos</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-calificacion" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                <i className="bi bi-star-fill text-warning me-2"></i>
                Califica tu experiencia
              </h3>
              <button 
                className="btn-close-modal"
                onClick={() => setIsOpen(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="modal-body">
              <div className="form-group">
                <label htmlFor="nombre">
                  <i className="bi bi-person"></i> Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  maxLength="100"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="form-group">
                <label htmlFor="apellido">
                  <i className="bi bi-person-check"></i> Apellido *
                </label>
                <input
                  type="text"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                  maxLength="100"
                  placeholder="Tu apellido"
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">
                  <i className="bi bi-telephone"></i> Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  placeholder="3001234567"
                  maxLength="10"
                />
                <small>Ingresa 10 dígitos</small>
              </div>

              <div className="form-group">
                <label htmlFor="puntuacion">
                  <i className="bi bi-star-fill text-warning"></i> Calificación *
                </label>
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} className="star-label">
                      <input
                        type="radio"
                        name="puntuacion"
                        value={star}
                        checked={formData.puntuacion === star}
                        onChange={(e) => setFormData({...formData, puntuacion: parseInt(e.target.value)})}
                      />
                      <i className={`bi bi-star${formData.puntuacion >= star ? '-fill' : ''}`}></i>
                    </label>
                  ))}
                </div>
                <small>Selecciona de 1 a 5 estrellas</small>
              </div>

              <div className="form-group">
                <label htmlFor="experiencia">
                  <i className="bi bi-chat-left-text"></i> Cuéntanos tu experiencia *
                </label>
                <textarea
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  required
                  maxLength="1000"
                  rows="4"
                  placeholder="Comparte tu experiencia con nosotros..."
                />
                <small>{formData.experiencia.length}/1000 caracteres</small>
              </div>

              <button 
                type="submit" 
                className="btn-enviar-calificacion"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-send-fill me-2"></i>
                    Enviar Calificación
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CalificacionModal;