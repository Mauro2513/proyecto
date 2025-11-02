package com.maddelivery.maddelivery.servicio;

import com.maddelivery.maddelivery.io.CartRequest;
import com.maddelivery.maddelivery.io.CartResponse;

public interface CartService {

    CartResponse addToCart(CartRequest request);

    CartResponse getCart();

    void clearCart();

    CartResponse removeFromCart(CartRequest cartRequest);
}
