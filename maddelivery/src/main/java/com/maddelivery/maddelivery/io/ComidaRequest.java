package com.maddelivery.maddelivery.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComidaRequest {

    private String nombre;
    private String descripcion;
    private double precio;
    private String categoria;
}
