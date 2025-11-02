package com.maddelivery.maddelivery.repositorio;

import com.maddelivery.maddelivery.entidad.OrderEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<OrderEntity, String> {
    List <OrderEntity> findByUserId(String userId);
}
