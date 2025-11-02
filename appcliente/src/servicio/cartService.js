import axios from "axios";

const API_URL = "http://localhost:8080/api/cart";

export const addToCart = async (foodId, token) => {
    try {
        await axios.post(
            API_URL, 
            { foodId }, 
            { headers: {Authorization: `Bearer ${token}` } }
        );
    } catch (error) {
        console.log("Error al añadir los datos del carrito:", error);
        throw error; // ✅ Propaga el error
    }
}

export const removeQtyFromCart = async (foodId, token) => {
    try {
        await axios.post(
            API_URL + '/remove', 
            {foodId}, 
            {headers: {Authorization: `Bearer ${token}`}}
        );
    } catch (error) {
        console.log("Error al remover las cantidades del carrito:", error);
        throw error; // ✅ Propaga el error
    }
}

export const getCartData = async (token) => {
    try {
        const response = await axios.get(
            API_URL,
            {headers: {Authorization: `Bearer ${token}`}},
        );
        return response.data.items || {}; // ✅ Retorna objeto vacío si items es undefined
    } catch (error) {
        console.log("Error al obtener los datos del carrito:", error);
        return {}; // ✅ CRÍTICO: Retorna objeto vacío en caso de error
    }
}

export const clearCartItems = async (token, setQuantities) => {
    try {
        await axios.delete(API_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setQuantities({});
    } catch (error) {
        console.error('Error limpiando el carrito', error);
        throw error;
    }
}