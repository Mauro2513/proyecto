import React from 'react';
import './Contactenos.css';

const Contactenos = () => {
  return (
    <section className="py-5">
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="contact-form p-5 shadow-sm bg-white">
                    <h2 className="text-center mb-4">Contactenos</h2>
                    <form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <input type="text" className="form-control custom-input" placeholder="Nombre" />
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control custom-input" placeholder="Apellido" />
                            </div>
                            <div className="col-12">
                                <input type="email" className="form-control custom-input" placeholder="Email" />
                            </div>
                            <div className="col-12">
                                <textarea className="form-control custom-input" rows="5" placeholder="Su mensaje" ></textarea>
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary w-100 py-3" type="submit">Enviar mensaje</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Contactenos;