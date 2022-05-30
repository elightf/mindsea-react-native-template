import React, { useEffect, useState } from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native'
import Svg, { Circle } from 'react-native-svg'
import { COLORS } from 'src/themes/colors'
import { AirplaneIcon } from 'src/themes/icons'

export const AircraftIcon = ({ ident, heading, lastPositionReport }: any) => {
  const [updated, setUpdated] = useState(0)

  useEffect(() => {
    if (updated !== lastPositionReport) {
      setUpdated(lastPositionReport)
    }
  })

  function secondsSinceUpdate(): number {
    let msSince = Date.now() - lastPositionReport
    return Math.round(msSince / 1000)
  }

  const recentEnough = secondsSinceUpdate() < 10

  function viewStyle(): StyleProp<ViewStyle> {
    return {
      opacity: recentEnough ? 1 : 0.7,
      paddingLeft: 20
    }
  }

  function acSvgStyle() {
    return {
      color: recentEnough ?
        'black' :
        'gray',
      transform: [{ rotateZ: (heading - 90) * Math.PI / 180 }]
    }
  }

  function callSignStyle(): StyleProp<TextStyle> {
    return {
      color: recentEnough ?
        COLORS.black :
        COLORS.gray,
      backgroundColor: 'white',
      padding: 2,
      fontSize: 10
    }
  }


  return (
    <View style={viewStyle()}>
      <View style={{ padding: 3 }}>
        <AirplaneIcon
          fill={acSvgStyle().color}
          // ts-ignore
          transform={acSvgStyle().transform}
          alignSelf="center"
        />
      </View>
      <Text style={callSignStyle()}>{ident}</Text>
    </View>
  )
}


