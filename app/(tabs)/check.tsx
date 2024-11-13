import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchEvents } from '@/api/api';
import { API_URL } from '@/config';
import { useRouter } from 'expo-router';

export default function Check() {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => Alert.alert('Opciones', 'Selecciona una opción', [
            { 
              text: 'Programar Salida', 
              onPress: () => navigation.navigate('otherScreens/programarSalida')
            },
            { text: 'Cancelar', style: 'cancel' }
          ])}
          style={styles.headerButton}
        >
          <Icon name="dots-vertical" size={24} color="#000" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Función para obtener los datos de la API
  const fetchData = async () => {
    const url = `${API_URL}/v2/reportes_avanzados/consulta/123`;
    const method = 'POST';

    try {
      await fetchEvents(setData, url, method, {}, router);

      setData((prevData) =>
        prevData.map(item => ({
          id: item.id.toString(),
          type: item.access_type === 'login' ? 'Entrada' : 'Salida',
          time: new Date(item.access_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date(item.access_time).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }),
          originalDate: item.access_time,
        }))
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos.');
    }
  };

  // Uso de useFocusEffect para recargar los datos cada vez que la pantalla se enfoque
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // Función para manejar el refresco
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  const renderItem = ({ item, index }) => {
    const isDayChange = index > 0 && item.date !== data[index - 1]?.date;

    return (
      <View>
        {isDayChange && (
          <View style={styles.daySeparator}>
            <Text style={styles.daySeparatorText}>{item.date}</Text>
          </View>
        )}
        <View style={styles.item}>
          <Text style={styles.itemText}>
            {item.type} - {item.time}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#f8f8f8', 
    padding: 5,
  },
  listContainer: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  headerButton: {
    marginRight: 10,
  },
  daySeparator: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#ddd',
    marginTop: 20,
  },
  daySeparatorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
});
