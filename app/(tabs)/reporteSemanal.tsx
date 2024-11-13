import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, RefreshControl, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { fetchEvents } from '@/api/api';
import { API_URL } from '@/config';

interface Report {
  id: string;
  week: string;
}

export default function Reportes() {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme].tint;
  const [data, setData] = useState<Report[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  //const iconColor = Colors['light'].tint;

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    const url = `${API_URL}/v2/reportes_avanzados/consulta/124`;
    const method = 'POST';

    try {
      await fetchEvents(setData, url, method);
      setData((prevData) =>
        prevData.map((item) => ({
          id: item.id.toString(),
          week: item.description,
        }))
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al obtener los datos.');
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  const handlePress = (report: Report) => {
    navigation.navigate('otherScreens/DetalleReporte', { id: report.id });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.row}>
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { width: width / 2 - 30 }]}
            onPress={() => handlePress(item)}
          >
            <Icon name="file-document" size={40} color={iconColor} style={styles.icon} />
            <Text style={styles.cardTitle}>{item.week}</Text>
            <Text style={styles.cardContent}>Revisa el detalle del reporte semanal.</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    height: 180,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  }, 
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
