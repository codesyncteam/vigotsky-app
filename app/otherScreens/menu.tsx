import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const menuData = [
  {
    id: '1',
    day: 'Lunes',
    date: '21 Ago 2024',
    icon: 'sunny-outline', // Icono para el día
    meals: [
      {
        time: 'Desayuno',
        mainDish: 'Tostadas de aguacate',
        dessert: 'Yogur con frutas',
        drink: 'Jugo de naranja',
      },
      {
        time: 'Comida',
        mainDish: 'Pollo asado con ensalada',
        dessert: 'Fruta de estación',
        drink: 'Agua mineral',
      },
    ],
  },
  {
    id: '2',
    day: 'Martes',
    date: '22 Ago 2024',
    icon: 'sunny-outline',
    meals: [
      {
        time: 'Desayuno',
        mainDish: 'Huevos revueltos con tomate',
        dessert: 'Pan integral',
        drink: 'Café con leche',
      },
      {
        time: 'Comida',
        mainDish: 'Pescado a la parrilla con verduras',
        dessert: 'Helado de vainilla',
        drink: 'Té verde',
      },
    ],
  },
  {
    id: '3',
    day: 'Miércoles',
    date: '23 Ago 2024',
    icon: 'sunny-outline',
    meals: [
      {
        time: 'Desayuno',
        mainDish: 'Avena con frutas',
        dessert: 'Tostadas integrales',
        drink: 'Batido de frutas',
      },
      {
        time: 'Comida',
        mainDish: 'Pasta con salsa de tomate',
        dessert: 'Gelatina',
        drink: 'Agua con limón',
      },
    ],
  },
  {
    id: '4',
    day: 'Jueves',
    date: '24 Ago 2024',
    icon: 'sunny-outline',
    meals: [
      {
        time: 'Desayuno',
        mainDish: 'Panqueques con miel',
        dessert: 'Fruta fresca',
        drink: 'Leche',
      },
      {
        time: 'Comida',
        mainDish: 'Carne asada con papas',
        dessert: 'Pastel de chocolate',
        drink: 'Refresco',
      },
    ],
  },
  {
    id: '5',
    day: 'Viernes',
    date: '25 Ago 2024',
    icon: 'sunny-outline',
    meals: [
      {
        time: 'Desayuno',
        mainDish: 'Sándwich de jamón y queso',
        dessert: 'Fruta picada',
        drink: 'Jugo de manzana',
      },
      {
        time: 'Comida',
        mainDish: 'Pizza de vegetales',
        dessert: 'Helado de fresa',
        drink: 'Té helado',
      },
    ],
  },
];

function MenuSemanal() {
  return (
    <View style={styles.container}>
      <FlatList
        data={menuData}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.dayContainer}>
              <Icon name={item.icon} size={24} color="#555" style={styles.icon} />
              <Text style={styles.itemDay}>{item.day}</Text>
            </View>
            {item.meals.map((meal, index) => (
              <View key={index} style={styles.meal}>
                <Text style={styles.mealTime}>{meal.time}</Text>
                <Text style={styles.mealDetail}>Plato Fuerte: {meal.mainDish}</Text>
                <Text style={styles.mealDetail}>Postre: {meal.dessert}</Text>
                <Text style={styles.mealDetail}>Bebida: {meal.drink}</Text>
              </View>
            ))}
            <Text style={styles.itemDate}>Fecha: {item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

export default MenuSemanal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
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
    position: 'relative',  // Necesario para la posición absoluta de la fecha
  },
  dayContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  itemDay: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDate: {
    fontSize: 12,
    color: '#666',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  meal: {
    marginBottom: 10,
  },
  mealTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  mealDetail: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
});
