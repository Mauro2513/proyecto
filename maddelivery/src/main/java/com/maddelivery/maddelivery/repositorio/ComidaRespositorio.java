package com.maddelivery.maddelivery.repositorio;

import com.maddelivery.maddelivery.entidad.ComidaEntidad;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComidaRespositorio extends MongoRepository<ComidaEntidad,String> {

}
