import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Profile() {
  const colorScheme = useColorScheme();
  const [name, setName] = useState('Juan Pérez');
  const [email, setEmail] = useState('juan.perez@example.com');
  const [phone, setPhone] = useState('555-1234');
  const [address, setAddress] = useState('Calle Falsa 123, Ciudad');
  const [editable, setEditable] = useState(false);

  const handleEditToggle = () => {
    setEditable(!editable);
  };
  const [curp, setCurp] = useState('ABCD123456HXYZ01');


  const handleSave = () => {
    setEditable(false);
    // Aquí podrías agregar la lógica para guardar la información actualizada
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <View style={styles.profileContainer}>
        <Icon name="person-circle-outline" size={100} color={Colors[colorScheme ?? 'light'].tint} style={styles.icon} />
        <Text style={[styles.name, { color: Colors[colorScheme ?? 'light'].text }]}>{name}</Text>
      </View>

      <View style={styles.form}>
        <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Nombre:</Text>
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          value={name}
          onChangeText={setName}
          editable={editable}
        />

        <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Correo Electrónico:</Text>
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          value={email}
          onChangeText={setEmail}
          editable={editable}
          keyboardType="email-address"
        />

        <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Teléfono:</Text>
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          value={phone}
          onChangeText={setPhone}
          editable={editable}
          keyboardType="phone-pad"
        />

        <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>Dirección:</Text>
        <TextInput
          style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
          value={address}
          onChangeText={setAddress}
          editable={editable}
        />

        <Text style={[styles.label, { color: Colors[colorScheme ?? 'light'].text }]}>CURP:</Text>
        <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].inputBorder }]}
        value={curp}
        onChangeText={setCurp}
        editable={editable}
        />


        <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].buttonBackground }]} onPress={editable ? handleSave : handleEditToggle}>
          <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].buttonText }]}>{editable ? 'Guardar' : 'Editar'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
