package com.maddelivery.maddelivery.controlador;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.maddelivery.maddelivery.io.ComidaRequest;
import com.maddelivery.maddelivery.io.ComidaResponse;
import com.maddelivery.maddelivery.servicio.ComidaServicio;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/platos")
@AllArgsConstructor
@CrossOrigin("*")
public class ComidaControlador {

    private final ComidaServicio comidaServicio;

    @PostMapping
    public ComidaResponse addFood(@RequestPart("comida") String comidaString,
                                  @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        ComidaRequest request = null;
        try {
            request = objectMapper.readValue(comidaString, ComidaRequest.class);
        }catch (JsonProcessingException ex){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Formato JSON invalido");

        }
        ComidaResponse response= comidaServicio.addFood(request, file);
        return response;
    }

    @GetMapping
    public List<ComidaResponse> readcomidas(){
        return comidaServicio.readComidas();
    }

    @GetMapping("/{id}")
    public  ComidaResponse readComida(@PathVariable String id){
        return comidaServicio.readComida(id);

    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void borrarComida(@PathVariable String id){
        comidaServicio.borrarComida(id);

    }
}
