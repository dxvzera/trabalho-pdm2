import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  // Solicitar permissão para a câmera e notificações
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const tirarFoto = async () => {
    if (cameraRef) {
      const foto = await cameraRef.takePictureAsync();
      console.log("Foto tirada:", foto.uri);
      enviarNotificacao();
    }
  };

  const enviarNotificacao = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Mais uma foto para a galeria!",
      },
      trigger: null, // Notificação imediata
    });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Permissão para a câmera foi negada.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={(ref) => setCameraRef(ref)} />
      <View style={styles.buttonContainer}>
        <Button title="Tirar Foto" onPress={tirarFoto} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#fff',
    padding: 10,
    alignSelf: 'center',
    marginTop: -80, // Ajusta o botão para estar sobre a câmera
  },
});
