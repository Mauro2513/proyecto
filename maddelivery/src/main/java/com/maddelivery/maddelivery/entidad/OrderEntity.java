package com.maddelivery.maddelivery.entidad;


import com.maddelivery.maddelivery.io.OrderItem;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "ordenes")
@Data
@Builder
public class OrderEntity {
    @Id
    private String id;
    private String userId;
    private String direccion;
    private String telefono;
    private String email;
    private List<OrderItem> orderItems;
    private double cuenta;
    private String estadoDePago;
    private String estado;


}
