import axios from "axios";

const API_URL = "http://localhost:8080/api/orders";

export const fetchAllOrders = async () => {
    try {
        const response = await axios.get(API_URL+"/all");
        return response.data;
    } catch (error) {
        console.error('Error occured while fetching the orders', error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId, estado) => {
    try {
        // CAMBIO: status -> estado (para coincidir con @RequestParam String estado)
        const response = await axios.patch(
            `${API_URL}/status/${orderId}?estado=${estado}`
        );
        return response.status === 200;
    } catch (error) {
        console.error('Error occured while updating the status', error);
        console.error('Error response:', error.response?.data);
        throw error;
    }
}