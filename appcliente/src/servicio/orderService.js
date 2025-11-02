import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const fetchUserOrders = async (token) => {
    try {
        const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        }); 
        return response.data;
    } catch (error) {
        console.error('Error al cargar las ordenes', error);
        throw error;
    }
}

export const createOrder = async (orderData, token) => {
    try {
        const response = await axios.post(
            API_URL+"/create",
            orderData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error al crear la orden', error);
        throw error;
    }
}

export const deleteOrder = async (orderId, token) => {
    try {
        await axios.delete(API_URL+"/"+ orderId, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error('Error al eliminar la orden', error);
        throw error;
    }
}