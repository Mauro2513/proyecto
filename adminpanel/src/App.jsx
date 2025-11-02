import React, { use, useState } from 'react';
import AddComida from './paginas/AddComida/AddComida'
import ListaComida from './paginas/ListaComida/ListaComida'
import Ordenes from './paginas/Ordenes/Ordenes'
import Sidebar from './componentes/Sidebar/Sidebar'
import Menubar from './componentes/Menubar/Menubar'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Calificaciones from './paginas/calificaciones/Calificaciones';

const App = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  }
  return (
    <div className="d-flex" id="wrapper">

            <Sidebar sidebarVisible={sidebarVisible}/>

            <div id="page-content-wrapper">

            <Menubar toggleSidebar={toggleSidebar}/>
            <ToastContainer />

                <div className="container-fluid">
                    <Routes>
                      <Route path='/agregar' element={<AddComida />}/>
                      <Route path='/lista' element={<ListaComida />}/>
                      <Route path='/ordenes' element={<Ordenes />}/>
                      <Route path='/' element={<ListaComida />}/>
                      <Route path="/calificaciones" element={<Calificaciones />} />
                    </Routes>
                </div>
            </div>
        </div>
  )
}

export default App