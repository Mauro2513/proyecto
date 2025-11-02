
import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { addComida } from '../../servicios/comidaServicio';
import { toast } from 'react-toastify';



const AddComida = () => {
  const [imagen, setImagen] = useState(false);
  const [data, setData] = useState({
    nombre:'',
    descripcion:'',
    precio: '',
    categoria: 'Hamburguesas'
  })

  const onChangeHandler = (event) => {
    const nombre = event.target.name;
    const value = event.target.value;
    setData(data =>({...data, [nombre]: value}));
  }

  const onSubmitHandler = async(event) => {
    event.preventDefault();
    if (!imagen) {
        toast.error('Por favor seleccione una imagen.');
        return;
    }
    try {
      await addComida(data, imagen);
      toast.success('Plato agregado con exito');
      setData({
        nombre:'',
        descripcion:'',
        precio: '',
        categoria: 'Hamburguesas'
      });
      setImagen(null);
    } catch (error) {
      toast.error('Error al agregar el plato');
    }
  
  }
  return (
    <div className="mx-2 mt-2">
  <div className="row">
    <div className="card col-md-4">
      <div className="card-body">
        <h2 className="mb-4">Agregar platos</h2>
        <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
                <img src={imagen ? URL.createObjectURL(imagen) : assets.upload} alt="" width={98}/>
            </label>
            <input type="file" className="form-control" id="imagen" hidden onChange={(e) => setImagen(e.target.files[0])}/>
          </div>

          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" placeholder='ej: Perro americano' className="form-control" id="nombre" required name='nombre' onChange={onChangeHandler} value={data.nombre}/>
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">Descripcion</label>
            <textarea className="form-control" placeholder='Escribe el contenido aqui' id="descripcion" rows="5" required name ='descripcion' onChange={onChangeHandler} value={data.descripcion} ></textarea>
          </div>

        <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoria</label>
            <select name='categoria' id='categoria' className='form-control' onChange={onChangeHandler} value={data.categoria}>
                <option value="hamburguesas">Hamburguesas</option>
                <option value="salchipapas">Salchipapas</option>
                <option value="perros">Perros calientes</option>
                <option value="pizzas">Pizzas</option>
                <option value="arabe">Arabe</option>
                <option value="Bebidas">Bebidas</option>
            </select>
          </div>

           <div className="mb-3">
            <label htmlFor="precio" className="form-label">Precio</label>
            <input type="number" name="precio" id="precio" placeholder='$' className='form-control'onChange={onChangeHandler} value={data.precio}/>
          </div>

          <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default AddComida;