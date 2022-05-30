import React, { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { LatLng } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { aircraftState, userState } from 'src/app/appSlice'
import { AircraftEntity } from 'src/Entities'
import { FlightListRow } from './FlightListRow'

export const FlightList: FC = () => {
  const userLocation: LatLng = useSelector(userState)

  const aircraft: AircraftEntity[] = useSelector(aircraftState)

  function aircraftSortedByThreat(): AircraftEntity[] {
    return aircraft.sort((a, b) => {
      if (threat(userLocation, a) < threat(userLocation, b)) {
        return -1
      }
      if (threat(userLocation, a) > threat(userLocation, b)) {
        return 1
      }

      return 0
    })
  }

  const styles = StyleSheet.create({
    container: {
      zIndex: 1,
      flexDirection: 'column',
      width: 400,
      maxHeight: 200,
      backgroundColor: 'white',
      opacity: 0.8,
      padding: 5
    },
    th: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 5,
      borderBottomWidth: 1,
      borderBottomColor: 'gray'
    },
    tr: {
      fontSize: 12,
      fontWeight: '800'
    }
  })

  return (
    <View style={styles.container}>
      <View style={styles.th}>
        <Text style={styles.tr}>IDENT</Text>
        <Text style={styles.tr}>DIST.</Text>
        <Text style={styles.tr}>REL BRG.</Text>
        <Text style={styles.tr}>DIFF</Text>
        <Text style={styles.tr}>THREAT</Text>
      </View>
      <FlatList
        data={aircraft.filter(ac => threat(userLocation, ac))}
        keyExtractor={(ac) => ac.id.toString()}
        renderItem={({ item }) => {
          return (
            <FlightListRow
              ident={item.callSign}
              distance={distance(item.coord, userLocation).toFixed(1)}
              threat={threatLevel(userLocation, item).toFixed(2)}
              relativeBearing={bearing(userLocation, item.coord)}
              bearingDiff={bearingDiff(userLocation, item)}
            />
          )
        }}
      />
    </View>
  )
}

// To eventually go into a logic layer of some kind
function distance(l1: LatLng, l2: LatLng): number {
  const { latitude: x1, longitude: y1 } = l1
  const { latitude: x2, longitude: y2 } = l2

  const dx = x2 - x1
  const dy = y2 - y1
  const h = Math.hypot(dx, dy)

  const conversion = 10000 / 90
  return h * conversion
}

function bearing(user: LatLng, obj: LatLng): number {
  // Get bearing to obj (TOA)
  const opp = obj.longitude - user.longitude
  const adj = obj.latitude - user.latitude

  let result = Math.atan2(opp, adj) * 180 / Math.PI
  return result >= 0 ? result : result + 360
}

function threat(user: LatLng, ac: AircraftEntity): boolean {
  return Math.abs(bearingDiff(user, ac)) < 50
}

function bearingDiff(user: LatLng, ac: AircraftEntity): number {
  return bearing(user, ac.coord) + ac.heading - 360
}

function threatLevel(user: LatLng, ac: AircraftEntity): number {
  const diff = bearingDiff(user, ac)
  return Math.min(diff / distance(user, ac.coord) * (100 / diff), 100)
}

const conversion = 10000 / 90