package com.maddelivery.maddelivery.entidad;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "usuarios")
@Builder
public class UserEntity {

    @Id
    private String id;
    private String nombre;
    private String email;
    private String password;
}
