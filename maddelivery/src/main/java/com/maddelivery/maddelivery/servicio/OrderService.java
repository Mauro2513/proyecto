package com.maddelivery.maddelivery.servicio;

import com.maddelivery.maddelivery.io.OrderRequest;
import com.maddelivery.maddelivery.io.OrderResponse;

import java.util.List;

public interface OrderService {

    OrderResponse createOrderWithPayment(OrderRequest request);

    List<OrderResponse> getUserOrders();

    void removeOrder(String orderId);

    List<OrderResponse> getOrdersOfAllUsers();

    void updateOrderStatus(String orderId, String status);

}
