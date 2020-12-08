import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccurary: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                })
            }
        }
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -15.8802964, longitude: -48.0178173 }} >
                <Image style={styles.avatar} source={{ uri: 'https://avatars2.githubusercontent.com/u/23109016?s=460&u=6e85bd07720e642f7ab3cd08e124debc66325d65&v=4' }} />

                <Callout onPress={() => {
                    //navegação
                    navigation.navigate('Profile', { github_username: 'jesiel15'});
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Jesiel Faria</Text>
                        <Text style={styles.devBio}>@Biografia Biografia Biografia Biografia</Text>
                        <Text style={styles.devTech}>Tecnologias, Tecnologias, Tecnologias</Text>

                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout:{
        width: 260,
    },
    devName:{
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#665',
        marginTop: 5,
    },
    devTech:{
        marginTop: 5,
    }
})
export default Main;
