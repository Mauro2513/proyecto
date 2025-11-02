package com.maddelivery.maddelivery.servicio;

import com.maddelivery.maddelivery.io.ComidaRequest;
import com.maddelivery.maddelivery.io.ComidaResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ComidaServicio {

    String uploadFile(MultipartFile file);

    ComidaResponse addFood(ComidaRequest request, MultipartFile file);

    List<ComidaResponse> readComidas();

    ComidaResponse readComida(String id);

    boolean borrarFile(String filename);

    void borrarComida(String id);
}
