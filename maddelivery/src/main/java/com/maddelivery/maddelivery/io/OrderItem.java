package com.maddelivery.maddelivery.io;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderItem {

    private String foodId;
    private int cantidad;
    private double precio;
    private String categoria;
    private String imageUrl;
    private String descripcion;
    private String nombre;
}
