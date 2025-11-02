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
public class OrderRequest {

    private List<OrderItem> orderedItems;
    private String direccion;
    private double cuenta;
    private String email;
    private String telefono;
    private String estado;


}
