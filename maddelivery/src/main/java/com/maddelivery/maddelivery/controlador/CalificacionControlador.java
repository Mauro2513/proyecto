package com.maddelivery.maddelivery.controlador;


import com.maddelivery.maddelivery.entidad.Calificacion;
import com.maddelivery.maddelivery.repositorio.CalificacionRepositorio;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/calificaciones")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class CalificacionControlador {

    private final CalificacionRepositorio calificacionRepositorio;

    @PostMapping
    public ResponseEntity<?> crearCalificacion(@Valid @RequestBody Calificacion calificacion) {
        try {
            Calificacion nuevaCalificacion = calificacionRepositorio.save(calificacion);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "¡Gracias por tu calificación!");
            response.put("data", nuevaCalificacion);

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error al guardar la calificación");
            errorResponse.put("error", e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping
    public ResponseEntity<List<Calificacion>> obtenerTodasCalificaciones() {
        List<Calificacion> calificaciones = calificacionRepositorio.findAllByOrderByFechaCreacionDesc();
        return ResponseEntity.ok(calificaciones);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerCalificacionPorId(@PathVariable Long id) {
        return calificacionRepositorio.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/puntuacion/{puntuacion}")
    public ResponseEntity<List<Calificacion>> obtenerPorPuntuacion(@PathVariable Integer puntuacion) {
        List<Calificacion> calificaciones = calificacionRepositorio.findByPuntuacion(puntuacion);
        return ResponseEntity.ok(calificaciones);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCalificacion(@PathVariable Long id) {
        try {
            if (calificacionRepositorio.existsById(id)) {
                calificacionRepositorio.deleteById(id);

                Map<String, Object> response = new HashMap<>();
                response.put("success", true);
                response.put("message", "Calificación eliminada exitosamente");

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error al eliminar la calificación");

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticas() {
        List<Calificacion> todasCalificaciones = calificacionRepositorio.findAll();

        Map<String, Object> estadisticas = new HashMap<>();
        estadisticas.put("total", todasCalificaciones.size());

        if (!todasCalificaciones.isEmpty()) {
            double promedio = todasCalificaciones.stream()
                    .mapToInt(Calificacion::getPuntuacion)
                    .average()
                    .orElse(0.0);

            estadisticas.put("promedio", Math.round(promedio * 100.0) / 100.0);

            // Contar por puntuación
            Map<Integer, Long> porPuntuacion = new HashMap<>();
            for (int i = 1; i <= 5; i++) {
                int puntuacion = i;
                long count = todasCalificaciones.stream()
                        .filter(c -> c.getPuntuacion() == puntuacion)
                        .count();
                porPuntuacion.put(puntuacion, count);
            }
            estadisticas.put("porPuntuacion", porPuntuacion);
        } else {
            estadisticas.put("promedio", 0.0);
            estadisticas.put("porPuntuacion", new HashMap<>());
        }

        return ResponseEntity.ok(estadisticas);
    }
}
