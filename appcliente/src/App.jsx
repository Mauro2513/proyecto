import React, { useContext } from "react";
import MenuBar from './componentes/MenuBar/MenuBar';
import { Route, Routes } from 'react-router-dom';
import Home from './paginas/Home/Home';
import Contactenos from './paginas/Contactenos/Contactenos';
import ExplorarComida from './paginas/ExplorarComida/ExplorarComida';
import FoodDetails from './paginas/FoodDetails/FoodDetails';
import Cart from './paginas/Cart/Cart';
import PlaceOrder from './paginas/PlaceOrder/PlaceOrder';
import Login from './componentes/Login/Login';
import Register from './componentes/Register/Register';
import { ToastContainer } from "react-toastify";
import MyOrders from './paginas/MyOrders/MyOrders';
import { StoreContext } from "./contexto/StoreContext";
import CalificacionModal from './componentes/CalificacionModal/CalificacionModal';

const App = () => {
  const { token } = useContext(StoreContext);
  return (
    <div>
      <MenuBar />
      <ToastContainer />
      <CalificacionModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contactenos' element={<Contactenos />} />
        <Route path='/explorar' element={<ExplorarComida />} />
        <Route path='/food/:id' element={<FoodDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={token ? <PlaceOrder /> : <Login />} />
        <Route path='/login' element={token ? <Home /> : <Login />} />
        <Route path='/register' element={token ? <Home /> : <Register />} />
        <Route path='/mispedidos' element={token ? <MyOrders /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App;