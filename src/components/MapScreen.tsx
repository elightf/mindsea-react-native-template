import React, { FC, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native';
import MapView, { Camera, Coordinate, EventUserLocation, Marker } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';
import {
  aircraftState,
  isTrackingUserState,
  refreshData,
  updateIsTrackingUserLocation,
  updateUserLocation,
  userState,
  cameraState
} from 'src/app/appSlice';
import { AircraftIcon } from 'src/components/AircraftIcon';
import { AircraftEntity } from 'src/Entities';

export const MapScreen: FC = () => {
  const aircraft: AircraftEntity[] = useSelector(aircraftState)
  const userLocation = useSelector(userState)
  const isTrackingUser = useSelector(isTrackingUserState)
  const camera = useSelector(cameraState)

  const mapRef = useRef<MapView>(null)

  const dispatch = useDispatch()

  const updateMap = () => {
    if (mapRef.current) {
      mapRef.current.getMapBoundaries().then(boundary => {
        dispatch(refreshData(boundary))
      })
    }
  }

  const updateUser = (event: EventUserLocation) => {
    dispatch(updateUserLocation(event.nativeEvent.coordinate))
  }

  useEffect(() => {
    setInterval(() => {
      updateMap()
    }, 4000)
  }, [])

  useEffect(() => {
    mapRef.current?.animateCamera(camera)
    dispatch(refreshData)
  }, [camera])

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  })

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        ref={mapRef}
        showsUserLocation={true}
        followsUserLocation={isTrackingUser}
        minZoomLevel={9}
        onRegionChangeComplete={region => updateMap()}
        onUserLocationChange={location => {
          updateUser(location)
        }}
        onPanDrag={() => dispatch(updateIsTrackingUserLocation(false))}
      >
        {aircraft.map((ac) => (
          <Marker
            key={ac.id}
            coordinate={{ latitude: ac.lat, longitude: ac.lon }}
          >
            <AircraftIcon
              ident={ac.callSign}
              heading={ac.heading}
              lastPositionReport={ac.lastPositionReport}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  )
}   