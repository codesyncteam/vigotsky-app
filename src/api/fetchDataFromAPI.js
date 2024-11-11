import config from '../config'; // Importar el archivo config correctamente

export const fetchDataFromAPI = async (endpoint, setDataCallback) => {
  try {
    const token = await AsyncStorage.getItem('token');  // Obtener token de AsyncStorage
    const url = `${config.API_URL}/${endpoint}`;        // Construir la URL de la API

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,  // Incluir el token en los headers
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();  // Parsear la respuesta
    console.log(data);

    if (data.status === 'success') {
      setDataCallback(data.data);  // Llamar al callback con los datos
    } else {
      console.error(`Error en la API ${endpoint}:`, data.message);
    }
  } catch (error) {
    console.error(`Error al obtener datos de la API ${endpoint}:`, error);
  }
};
