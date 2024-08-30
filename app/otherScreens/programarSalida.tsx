import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProgramarSalida({ navigation }) {
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

 

  const handleReservation = () => {
    alert('Formulario enviado');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la persona"
            value={name}
            onChangeText={setName}
          />

          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <Text style={styles.imagePickerText}>Seleccionar Foto</Text>
            )}
          </TouchableOpacity>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Comentarios adicionales"
            value={comments}
            onChangeText={setComments}
            multiline={false}
            numberOfLines={4}
          />

          <View style={styles.reserveButtonContainer}>
                <TouchableOpacity style={styles.reserveButton} onPress={handleReservation}>
                <Text style={styles.reserveButtonText}>Programar Salida</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  imagePickerText: {
    color: '#aaa',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  reserveButtonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  reserveButton: {
    backgroundColor: '#29348E',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
