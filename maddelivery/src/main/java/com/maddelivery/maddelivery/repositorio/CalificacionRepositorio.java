package com.maddelivery.maddelivery.repositorio;


import com.maddelivery.maddelivery.entidad.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalificacionRepositorio extends JpaRepository<Calificacion, Long> {

    // Método para obtener calificaciones ordenadas por fecha (más recientes primero)
    List<Calificacion> findAllByOrderByFechaCreacionDesc();

    // Método para buscar por puntuación
    List<Calificacion> findByPuntuacion(Integer puntuacion);
}
