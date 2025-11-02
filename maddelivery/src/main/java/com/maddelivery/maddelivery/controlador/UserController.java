package com.maddelivery.maddelivery.controlador;


import com.maddelivery.maddelivery.io.UserRequest;
import com.maddelivery.maddelivery.io.UserResponse;
import com.maddelivery.maddelivery.servicio.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class UserController {

    private final UserService userService;


    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse register(@RequestBody UserRequest request){
        return userService.registerUser(request);

    }
}
