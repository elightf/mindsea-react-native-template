import { loadPartialConfig } from "@babel/core";
import { LatLng } from "react-native-maps";
import { OSAllAircraftResponseKey } from "./api/enums.js";

export interface Location2D {
    lat: number
    lon: number

    coord: LatLng
}

export class Location implements Location2D {
    constructor(
        public lat: number,
        public lon: number
    ) {}
    
    get coord(): LatLng {
      return { 
        latitude: this.lat,
        longitude: this.lon
      }
    } 
}

export interface AircraftEntity extends Location2D {
    id: number
    callSign: string
    speed: number
    heading: number
    isAirborne: boolean
    lastPositionReport: number
}

export class Aircraft implements AircraftEntity{
    id: number
    callSign: string
    lat: number
    lon: number
    speed: number
    heading: number
    isAirborne: boolean
    lastPositionReport: number

    constructor (raw: any[]) {
        this.id = raw[OSAllAircraftResponseKey.transponderIdHex]
        this.callSign = raw[OSAllAircraftResponseKey.callSign].trim()
        this.lat = raw[OSAllAircraftResponseKey.latitude]
        this.lon = raw[OSAllAircraftResponseKey.longitude]
        this.speed = raw[OSAllAircraftResponseKey.velocity]
        this.heading = raw[OSAllAircraftResponseKey.trueTrack]
        this.isAirborne = !raw[OSAllAircraftResponseKey.isOnGround]
        this.lastPositionReport = raw[OSAllAircraftResponseKey.lastPositionTimeUnix] * 1000
    }

    get coord(): LatLng {
      return { 
        latitude: this.lat,
        longitude: this.lon
      }
    } 
}
