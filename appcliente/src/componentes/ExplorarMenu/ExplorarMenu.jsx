import React, { useRef } from 'react';
import { categorias } from '../../assets/assets';
import './ExplorarMenu.css';

const ExplorarMenu = ({categoria, setCategoria}) => {
  const menuRef = useRef(null);
  const scrollLeft = () => {
    if (menuRef.current){
        menuRef.current.scrollBy({left: -200, behavior: 'smooth'});
        }
    };

    const scrollRight = () => {
        if(menuRef.current){
            menuRef.current.scrollBy({left: 200, behavior: 'smooth'});
        }
    };

  return (
    <div className="explore-menu position-relative">
        <h1 className="d-flex align-items-center justify-content-between">
            Explora nuestro menu
            <div className="d-flex">
            <i className='bi bi-arrow-left-circle scroll-icon' 
            onClick={scrollLeft}
            > </i>
            <i 
            className='bi bi-arrow-right-circle scroll-icon' 
            onClick={scrollRight}
            > </i>
            </div>
        </h1>
        <p>Explora una lista seleccionada de platos de nuestras categorías principales</p>
        <div 
        className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list" 
        ref={menuRef}
        >
        {categorias.map((item, index) => {
            return (
                <div
                key={index} 
                className="text-center explore-menu-list-item" 
                onClick={() => 
                    setCategoria((prev) => 
                        prev === item.categoria ? 'All': item.categoria
                        )
                    }
                >
                    <img 
                        src={item.icon} 
                        alt="" 
                        className={
                            item.categoria === categoria 
                            ? 'rounded-circle active'
                            : 'rounded-circle'
                        } 
                        height={128} 
                        width={128}
                        />
                        <p
                        className={
                            item.categoria === categoria
                            ? "mt-2 fw-bold text-active"
                            : "mt-2 fw-bold"
                        }
                    >
                        {item.categoria}
                    </p>
                    </div>
                );
            })}
        </div>
        <hr />
    </div>
  );
};

export default ExplorarMenu;