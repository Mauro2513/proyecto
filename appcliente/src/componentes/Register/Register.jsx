import React, { useState } from 'react';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { registerUser } from '../../servicio/authServicio';

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (event) => {
    const nombre = event.target.name;
    const value = event.target.value;
    setData(data => ({...data, [nombre]: value}));
  }

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    try {
      const response = await registerUser(data);
      if (response.status === 201) {
        toast.success("Usuario registrado con exito. Por favor inicie sesion.");
        navigate('/login');
      }else{
        toast.error("Error al registrar el usuario, por favor intente nuevamente.");
      }
    } catch (error) {
      toast.error("Error al registrar el usuario, por favor intente nuevamente.");
    }


    // Lógica para manejar el registro del usuario
  }


  return (
    <div className="register-container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Registrate</h5>
            <form onSubmit={onSubmitHandler}>
              <div className="form-floating mb-3">
                <input type="text" 
                className="form-control" 
                id="floatingName" 
                placeholder="Nombre" 
                name='nombre' 
                onChange={onChangeHandler}
                value={data.nombre}
                required
                />
                <label htmlFor="floatingName">Nombre y apellido</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" 
                className="form-control" 
                id="floatingInput" 
                placeholder="name@example.com"
                name='email'
                onChange={onChangeHandler}
                value={data.email}
                required 
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" 
                className="form-control" 
                id="floatingPassword" 
                placeholder="Password"
                name='password'
                onChange={onChangeHandler}
                value={data.password}
                required
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-login text-uppercase" type="submit">Registrarse
                </button>
                <div className="d-grid">
                <button className="btn btn-outline-danger btn-login text-uppercase mt-2" type="reset">Borrar
                </button>
                </div>
            </div>
              <div className="mt-4">Ya tienes una cuenta? <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Register;