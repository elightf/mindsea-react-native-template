import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export const FlightListRow: FC = ({ ident, distance, threat, relativeBearing, bearingDiff }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 12,
      paddingVertical: 2,
    },
    tr: {
      justifyContent: 'space-between',
      width: 80,
      fontSize: 12
    }
  })
  return (
    <View style={styles.container}>
      <Text style={styles.tr}>{ident}</Text>
      <Text style={styles.tr}>{distance}</Text>
      <Text style={styles.tr}>{relativeBearing.toFixed(0)}</Text>
      <Text style={styles.tr}>{bearingDiff.toFixed(0)}</Text>
      <Text style={styles.tr}>{threat}</Text>
    </View>
  )
}