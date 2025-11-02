package com.maddelivery.maddelivery.entidad;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection ="comidas")
public class ComidaEntidad {
    @Id
    private String id;
    private String nombre;
    private String descripcion;
    private double precio;
    private String categoria;
    private String imageUrl;
}
