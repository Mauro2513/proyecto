import axios from "axios";

const API_URL = 'http://localhost:8080/api/platos';

export const addComida = async (comidaData, imagen) => {
    const formData = new FormData();
    formData.append('comida', JSON.stringify(comidaData));
    formData.append('file', imagen);

    try {
        await axios.post(API_URL, formData, {headers: { "Content-Type": "multipart/form-data"}});
    } catch (error) {
        console.log('Error', error);
        throw error;
    }
}

export const getFoodList = async () => {
  try {
      const response = await axios.get(API_URL);
      return response.data;   
  } catch (error) {
    console.log('Error al mostrar la lista', error);
    throw error;
  }
}

export const deleteFood = async (comidaId) => {
  try {
    const response = await axios.delete(API_URL+"/"+comidaId);
  return response.status === 204;
  } catch (error) {
    console.log('Error al eliminar la comida.', error);
    throw error;
  }
}