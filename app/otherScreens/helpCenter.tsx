import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';

export default function HelpCenter() {
  const colorScheme = useColorScheme();
  const iconColor = Colors[colorScheme ?? 'light'].tint;

  const handleEmailPress = () => {
    Linking.openURL('mailto:contacto@utzilon.com');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Centro de Ayuda</Text>

      <View style={styles.section}>
        <Icon name="mail-outline" size={30} color={iconColor} />
        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={styles.sectionText}>Contacto por correo: contacto@utzilon.com</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Icon name="globe-outline" size={30} color={iconColor} />
        <TouchableOpacity onPress={() => Linking.openURL('https://utzilon.com')}>
          <Text style={styles.sectionText}>Visitar nuestro sitio web: www.utzilon.com</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Icon name="information-circle-outline" size={30} color={iconColor} />
        <Text style={styles.sectionText}>
          Si tienes alguna duda o consulta adicional, no dudes en contactarnos.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.light.text,
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 10,
  },
});
