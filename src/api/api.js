import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchEvents = async (setEvents, url, method = 'POST', body = {}) => {
  try {
    const token = await getToken(); // Obtén el token almacenado

    console.log('URL:', url);
    console.log('Método:', method);
    
    // Realiza la solicitud con el método y cuerpo dinámico
    const response = await fetch(url, {
      method: method, // Método dinámico
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Agrega el token en los encabezados
      },
      body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : null, // Solo incluye body si el método es POST o PUT
    });

    // Verifica si la respuesta HTTP es exitosa (status 2xx)
    if (response.status === 401) {
      console.log('Token expirado. Intentando renovar token...');
      const newToken = await refreshToken(); // Función para refrescar el token
      if (newToken) {
        await saveToken(newToken); // Guarda el nuevo token
        return fetchEvents(setEvents, url, method, body); // Reintenta la solicitud con el nuevo token
      } else {
        throw new Error('No se pudo renovar el token');
      }
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('result:', result);

    // Captura el estatus de la respuesta de la API
    if (result.status === 'success') {
      setEvents(result.data);
    } else {
      console.error('Error en la respuesta de la API:', result.message);
    }
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
  }
};

// Obtiene el token almacenado
const getToken = async () => {
  return AsyncStorage.getItem('token');
};

// Guarda el token en el almacenamiento
const saveToken = async (token) => {
  AsyncStorage.setItem('token', token);
};

// Función para refrescar el token
const refreshToken = async () => {
  try {
    const form = new FormData();
    form.append("token", await getToken()); // Envía el token actual para refrescarlo

    const response = await fetch('${API_URL}/refresh_token', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await getToken()}`,
      },
      body: form,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Nuevo token obtenido:', data.access_token); // Accede al access_token
      return data.access_token; // Devuelve el nuevo token
    } else {
      throw new Error('No se pudo refrescar el token');
    }
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    return null;
  }
};
