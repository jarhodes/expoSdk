import React, { useRef } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default function CameraTest() {

    const [hasCameraPermission, setCameraPermission] = React.useState('');
    const [photoName, setPhotoName] = React.useState('');
    const [photoBase64, setPhotoBase64] = React.useState('');

    const camera = useRef(null);

    React.useEffect( () => {
        askCameraPermission();
    }, []);

    const askCameraPermission = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setCameraPermission(status == 'granted');
    }

    const snap = async () => {
        if (camera) {
            const photo = await camera.current.takePictureAsync({base64: true});
            setPhotoName(photo.uri);
            setPhotoBase64(photo.base64);
        }
    }

    return (
        <View style={styles.container}>
            { hasCameraPermission ? 
                (
                    <View style={styles.container}>
                        <Camera style={styles.cameraElement} ref={camera} />
                        <View>
                            <Button title="Take photo" onPress={snap} />
                        </View>
                        <View style={styles.cameraElement}>
                            <Image style={styles.container} source={{uri: photoName}} />
                            <Image style={styles.container} source={{uri: `data:image/gif;base64,${photoBase64}`}} />
                        </View>
                    </View>
                ) : (
                    <Text>No access to camera</Text>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraElement: {
        flex: 4
    }
});