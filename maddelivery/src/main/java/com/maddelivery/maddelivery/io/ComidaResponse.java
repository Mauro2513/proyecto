package com.maddelivery.maddelivery.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ComidaResponse {
    private String id;
    private String nombre;
    private String descripcion;
    private String imageUrl;
    private double precio;
    private String categoria;
}
