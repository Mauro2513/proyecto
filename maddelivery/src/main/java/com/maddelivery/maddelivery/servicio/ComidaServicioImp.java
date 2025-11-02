package com.maddelivery.maddelivery.servicio;

import com.maddelivery.maddelivery.entidad.ComidaEntidad;
import com.maddelivery.maddelivery.io.ComidaRequest;
import com.maddelivery.maddelivery.io.ComidaResponse;
import com.maddelivery.maddelivery.repositorio.ComidaRespositorio;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectResponse;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ComidaServicioImp implements ComidaServicio{

    @Autowired
    private S3Client s3Client;

    @Autowired
    private ComidaRespositorio comidaRespositorio;

    @Value("${aws.s3.bucketname}")
    private String bucketName;

    @Override
    public String uploadFile(MultipartFile file) {
       String filenameExtension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1) ;
       String key = UUID.randomUUID().toString()+"."+filenameExtension;
       try{
           PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                   .bucket(bucketName)
                   .key(key)
                   .acl("public-read")
                   .contentType(file.getContentType())
                   .build();
           PutObjectResponse response = s3Client.putObject(putObjectRequest, RequestBody.fromBytes(file.getBytes()));

           if(response.sdkHttpResponse().isSuccessful()){
               return "http://"+bucketName+".s3.amazonaws.com/"+key;
           }else{
               throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Fallo al subir archivo");
           }

       }catch(IOException ex) {
           throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Un error ocurrio al subir el archivo");

       }
    }

    @Override
    public ComidaResponse addFood(ComidaRequest request, MultipartFile file) {
    ComidaEntidad newComidaEntidad = convertToEntity(request);
    String imageUrl = uploadFile(file);
    newComidaEntidad.setImageUrl(imageUrl);
    newComidaEntidad = comidaRespositorio.save(newComidaEntidad);
    return convertToResponse(newComidaEntidad);
    }

    @Override
    public List<ComidaResponse> readComidas() {
        List<ComidaEntidad> databaseEntries = comidaRespositorio.findAll();
        return databaseEntries.stream().map(object -> convertToResponse(object)).collect(Collectors.toList());
    }

    @Override
    public ComidaResponse readComida(String id) {
        ComidaEntidad comidaExistente = comidaRespositorio.findById(id).orElseThrow(() ->new RuntimeException("Comida no encontrada para el id "+ id));
        return convertToResponse(comidaExistente);
    }

    @Override
    public boolean borrarFile(String filename) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(filename)
                .build();
        s3Client.deleteObject(deleteObjectRequest);
        return true;
    }

    @Override
    public void borrarComida(String id) {
         ComidaResponse response = readComida(id);
         String imageUrl = response.getImageUrl();
         String filename = imageUrl.substring(imageUrl.lastIndexOf("/")+1);
         boolean isFileDelete = borrarFile(filename);
         if (isFileDelete) {
              comidaRespositorio.deleteById(response.getId());
          }

    }

    private ComidaEntidad convertToEntity(ComidaRequest request) {
        return ComidaEntidad.builder()
                .nombre(request.getNombre())
                .descripcion(request.getDescripcion())
                .categoria(request.getCategoria())
                .precio(request.getPrecio())
                .build();
    }

    private ComidaResponse convertToResponse(ComidaEntidad entity){
        return ComidaResponse.builder()
                .id(entity.getId())
                .nombre(entity.getNombre())
                .descripcion(entity.getDescripcion())
                .categoria(entity.getCategoria())
                .precio(entity.getPrecio())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}
