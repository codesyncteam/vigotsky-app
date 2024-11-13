import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchEvents = async (setEvents, url, method = 'POST', body = {}, navigation) => {
  try {
    const token = await getToken();

    console.log('URL:', url);
    console.log('Método:', method);

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : null,
    });

    if (response.status === 401) {
      console.log('Token expirado. Cerrando sesión...');
      await AsyncStorage.removeItem('token');
      if (navigation) navigation.replace('otherScreens/login');
      return;
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('result:', result);

    if (result.status === 'success') {
      setEvents(result.data);
    } else {
      console.error('Error en la respuesta de la API:', result.message);
    }
  } catch (error) {
    console.error('Error al obtener los datos de la API:', error);
  }
};

const getToken = async () => {
  return AsyncStorage.getItem('token');
};
