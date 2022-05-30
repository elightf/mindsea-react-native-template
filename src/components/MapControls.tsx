import React, { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LocationFilledIcon, LocationIcon } from 'src/themes/icons'
import { isTrackingUserState, updateIsTrackingUserLocation, userState } from 'src/app/appSlice'
import { useDispatch, useSelector } from 'react-redux'
import { COLORS } from 'src/themes/colors'

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50
  }
})

function iconStyle() {
  return {

  }
}

export const MapControls: FC = () => {
  const isTracking = useSelector(isTrackingUserState)

  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      {
        isTracking ?
          <LocationFilledIcon fill={COLORS.blue} scale="0.5" />
          :
          <TouchableOpacity onPress={() => {
            dispatch(updateIsTrackingUserLocation(true))
          }}>
            <LocationIcon fill={COLORS.blue} scale="0.5" opacity="0.6" />
          </TouchableOpacity>
      }
    </View>
  )
}