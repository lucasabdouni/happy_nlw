import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import mapMarkerImg from '../../images/map-marker.png';

interface LocationParams {
  coords: {
    latitude: number;
    longitude: number;
  }
}

export default function SelectMapPosition() {
  const navigation = useNavigation();
  const [position, setPosition] = useState ({ latitude: 0, longitude: 0 });
  const [location, setLocation] = useState<LocationParams>();

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
       if (status !== 'granted') {
        alert('Eita, precisamos de acesso ào GPS...');
        return;
      }

      const location = await Location.getCurrentPositionAsync({}); 
      setLocation(location);
    })();
  }, []);

  function handleNextStep() {
    navigation.navigate('OrphanageData', { position });
  }

  function handleSelectedMapPosition(event: MapEvent) {
    setPosition(event.nativeEvent.coordinate);
  }

  return (
    <View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: location?.coords.latitude,
          longitude: location?.coords.latitude,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        } as any}
        style={styles.mapStyle}
        onPress={handleSelectedMapPosition}
      >
        { position.latitude !== 0 && (
          <Marker 
            icon={mapMarkerImg}
            coordinate={{ latitude: position.latitude, longitude: position.longitude }}
          />
        )}
      </MapView>

      { position.latitude !== 0 && (    
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
