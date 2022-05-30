import React, { FC } from 'react';
import { MapScreen } from '../../components/MapScreen';
import { FlightList } from 'src/components/FlightList/FlightList';
import { MapControls } from 'src/components/MapControls';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 6
  }
})

export const MainScreen: FC = () => {
  return (
    <>
      <View style={styles.container}>
        <FlightList />
        <MapControls />
      </View>
      <MapScreen />
    </>
  )
}
