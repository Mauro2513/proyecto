package com.maddelivery.maddelivery.servicio;

import com.maddelivery.maddelivery.io.UserRequest;
import com.maddelivery.maddelivery.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

    String findByUserId();
}
