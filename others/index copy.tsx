import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Reunión de Padres</Text>
        <Text style={styles.cardContent}>
          Se invita a todos los padres de familia a la reunión que se llevará a cabo el próximo viernes a las 5:00 PM en el auditorio principal.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Departamento Académico</Text>
          <Text style={styles.cardDate}>10 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Entrega de Boletas</Text>
        <Text style={styles.cardContent}>
          Las boletas de calificaciones del segundo trimestre estarán disponibles el lunes en la oficina de la dirección.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Dirección</Text>
          <Text style={styles.cardDate}>07 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Día del Deporte</Text>
        <Text style={styles.cardContent}>
          No olviden que el próximo lunes es el Día del Deporte. Todos los estudiantes deben venir con su uniforme deportivo.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Educación Física</Text>
          <Text style={styles.cardDate}>15 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Vacaciones de Invierno</Text>
        <Text style={styles.cardContent}>
          Las vacaciones de invierno comenzarán el 20 de diciembre. Las clases se reanudarán el 7 de enero.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Administración</Text>
          <Text style={styles.cardDate}>20 Dic 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Exámenes Finales</Text>
        <Text style={styles.cardContent}>
          Los exámenes finales se llevarán a cabo la próxima semana. Revise el calendario para conocer las fechas exactas de cada materia.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Departamento Académico</Text>
          <Text style={styles.cardDate}>13 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Feria de Ciencias</Text>
        <Text style={styles.cardContent}>
          La Feria de Ciencias se realizará el 15 de noviembre. Los estudiantes interesados en participar deben registrarse antes del 10 de noviembre.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Ciencias</Text>
          <Text style={styles.cardDate}>15 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Simulacro de Evacuación</Text>
        <Text style={styles.cardContent}>
          Mañana a las 10:00 AM se realizará un simulacro de evacuación. Por favor, sigan las instrucciones del personal.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Seguridad</Text>
          <Text style={styles.cardDate}>08 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Jornada de Vacunación</Text>
        <Text style={styles.cardContent}>
          La jornada de vacunación contra la influenza será el próximo miércoles. Los estudiantes deben traer la autorización firmada por los padres.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Enfermería</Text>
          <Text style={styles.cardDate}>09 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Nuevo Horario de Clases</Text>
        <Text style={styles.cardContent}>
          A partir del próximo mes, el horario de clases cambiará. Consulta la página web para obtener más información.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Dirección</Text>
          <Text style={styles.cardDate}>01 Dic 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Programa de Reciclaje</Text>
        <Text style={styles.cardContent}>
          Estamos implementando un nuevo programa de reciclaje. Por favor, utiliza los contenedores de reciclaje colocados en todo el campus.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Medio Ambiente</Text>
          <Text style={styles.cardDate}>05 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Clases de Refuerzo</Text>
        <Text style={styles.cardContent}>
          Se ofrecerán clases de refuerzo de matemáticas y ciencias los sábados. Inscripciones abiertas en la oficina de la escuela.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Departamento Académico</Text>
          <Text style={styles.cardDate}>12 Nov 2023</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card}>
        <Text style={styles.cardTitle}>Cierre de Inscripciones</Text>
        <Text style={styles.cardContent}>
          El cierre de inscripciones para el próximo ciclo escolar es el 31 de mayo. Asegúrate de completar todos los trámites antes de esa fecha.
        </Text>
        <Image
          source={{ uri: 'https://spruko.com/demo/ynex/dist/assets/images/nft-images/3.png' }}
          style={styles.cardImage}
        />
        <View style={styles.cardFooter}>
          <Text style={styles.cardDepartment}>Administración</Text>
          <Text style={styles.cardDate}>31 May 2023</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  card: {
    width: '95%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardFooter: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDepartment: {
    fontSize: 12,
    color: '#999',
    textAlign: 'left',
  },
  cardDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
});
