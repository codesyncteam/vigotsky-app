import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Colors } from '../../src/constants/Colors';
import { useColorScheme } from 'react-native';

export default function Notifications() {
  const colorScheme = useColorScheme();
  const [notifyGrades, setNotifyGrades] = useState(true);
  const [notifyEvents, setNotifyEvents] = useState(false);
  const [notifyPayments, setNotifyPayments] = useState(true);
  const [notifyGeneral, setNotifyGeneral] = useState(true);

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Notificarme sobre calificaciones
        </Text>
        <Switch
          value={notifyGrades}
          onValueChange={setNotifyGrades}
          thumbColor={notifyGrades ? '#ccc' : '#29348E'} // Color del interruptor
          trackColor={{ false: '#ccc', true: '#29348E' }} // Color de la pista
        />
      </View>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Notificarme sobre eventos
        </Text>
        <Switch
          value={notifyEvents}
          onValueChange={setNotifyEvents}
          thumbColor={notifyEvents ? '#ccc' : '#29348E'}
          trackColor={{ false: '#ccc', true: '#29348E' }}
        />
      </View>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Notificarme sobre pagos pendientes
        </Text>
        <Switch
          value={notifyPayments}
          onValueChange={setNotifyPayments}
          thumbColor={notifyPayments ? '#ccc' : '#29348E'}
          trackColor={{ false: '#ccc', true: '#29348E' }}
        />
      </View>

      <View style={styles.optionContainer}>
        <Text style={[styles.optionText, { color: Colors[colorScheme ?? 'light'].text }]}>
          Notificaciones generales
        </Text>
        <Switch
          value={notifyGeneral}
          onValueChange={setNotifyGeneral}
          thumbColor={notifyGeneral ? '#ccc' : '#29348E'}
          trackColor={{ false: '#ccc', true: '#29348E' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 18,
  },
});
