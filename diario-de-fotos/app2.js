import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Notifications from 'expo-notifications';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  // Solicitar permissão para a câmera
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Função para tirar foto e enviar notificação
  const tirarFoto = async () => {
    if (cameraRef) {
      const foto = await cameraRef.takePictureAsync();
      enviarNotificacao(); // Enviar notificação após a foto ser capturada
      console.log("Foto tirada:", foto.uri);
    }
  };

  // Configuração da notificação
  const enviarNotificacao = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Mais uma foto para a galeria!",
      },
      trigger: null, // Trigger imediato
    });
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso à câmera foi negado.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={(ref) => setCameraRef(ref)} />
      <Button title="Tirar Foto" onPress={tirarFoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0,
    backgroundColor: '#fff',
    padding: 10,
    margin: 20,
  },
});
