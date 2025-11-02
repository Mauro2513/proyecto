package com.maddelivery.maddelivery.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private String id;
    private String userId;
    private String direccion;
    private String telefono;
    private String email;
    private double cuenta;
    private String estadoDePago;
    private String estado;
    private List <OrderItem> orderedItems;
}
