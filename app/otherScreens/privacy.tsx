import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../src/constants/Colors';
import { useColorScheme } from 'react-native';

export default function Privacy() {
  const colorScheme = useColorScheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Política de Privacidad</Text>

      <Text style={[styles.paragraph, { color: Colors[colorScheme ?? 'light'].text }]}>
        En vigotsky.app, nos comprometemos a proteger tu privacidad. Esta política de privacidad explica cómo recopilamos, usamos, compartimos y protegemos tu información personal.
      </Text>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Recopilación de Información</Text>
      <Text style={[styles.paragraph, { color: Colors[colorScheme ?? 'light'].text }]}>
        Recopilamos información que nos proporcionas directamente, como cuando creas una cuenta, actualizas tu perfil o te comunicas con nosotros. También recopilamos información automáticamente cuando utilizas nuestros servicios, como datos de uso.
      </Text>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Uso de la Información</Text>
      <Text style={[styles.paragraph, { color: Colors[colorScheme ?? 'light'].text }]}>
        Utilizamos tu información para proporcionar y mejorar nuestros servicios, personalizar tu experiencia, y comunicarnos contigo sobre actualizaciones o promociones.
      </Text>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Compartir Información</Text>
      <Text style={[styles.paragraph, { color: Colors[colorScheme ?? 'light'].text }]}>
        No compartimos tu información personal con terceros, excepto en los casos necesarios para cumplir con la ley, proteger nuestros derechos o con tu consentimiento.
      </Text>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Seguridad de la Información</Text>
      <Text style={[styles.paragraph, { color: Colors[colorScheme ?? 'light'].text }]}>
        Implementamos medidas de seguridad para proteger tu información contra el acceso, alteración, divulgación o destrucción no autorizados.
      </Text>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Tus Derechos</Text>
      <Text style={[styles.paragraph, { color: Colors[colorScheme ?? 'light'].text }]}>
        Tienes derecho a acceder, corregir o eliminar tu información personal, así como a restringir o oponerte a ciertos procesamientos de tu información.
      </Text>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Cambios en esta Política</Text>
      <Text style={[styles.paragraph, { color: Colors[colorScheme ?? 'light'].text }]}>
        Podemos actualizar esta política de privacidad de vez en cuando. Te notificaremos sobre cualquier cambio material a través de nuestro sitio web o por otros medios.
      </Text>

      <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Contacto</Text>
      <Text style={[styles.paragraph, { color: Colors[colorScheme ?? 'light'].text }]}>
        Si tienes alguna pregunta o inquietud sobre nuestra política de privacidad, no dudes en contactarnos.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
});
