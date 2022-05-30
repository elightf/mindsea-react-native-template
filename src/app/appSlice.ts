import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { LocationRegionBox, MapDataFactory } from "src/api/AircraftData";
import { DataFactoryType } from "src/api/enums";
import { Camera, LatLng, Region } from "react-native-maps";
import { Aircraft, AircraftEntity } from "src/Entities";

type AppState = {
  region: Region
  aircraft: AircraftEntity[]
  userLocation: LatLng
  isTrackingUserLocation: boolean
  camera: Camera
}

const initialState: AppState = {
  region: { latitude: 0.0, longitude: 0.0, latitudeDelta: 1, longitudeDelta: 1 },
  aircraft: [],
  userLocation: { latitude: 0, longitude: 0 },
  isTrackingUserLocation: true,
  camera: {
    center: { latitude: 0.0, longitude: 0.0 },
    heading: 0,
    pitch: 0,
    zoom: 30,
    altitude: 200000
  }
}

const mapData = MapDataFactory.create(DataFactoryType.openSky)

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: { 
    updateUserLocation: (state, action) => {
      state.userLocation.latitude = action.payload.latitude
      state.userLocation.longitude = action.payload.longitude
      if (state.isTrackingUserLocation) {
        state.camera.center = { 
          latitude: action.payload.latitude, 
          longitude: action.payload.longitude
        }
      }
    },
    updateIsTrackingUserLocation: (state, action) => {
      let shouldTrack = action.payload

      if (shouldTrack) {
        state.camera.center = { 
          latitude: state.userLocation.latitude, 
          longitude: state.userLocation.longitude
        }
      }

      state.isTrackingUserLocation = shouldTrack
    }
  },
  extraReducers(builder) {
    builder
      .addCase(refreshData.fulfilled, (state, action) => {
        state.aircraft = action.payload as Aircraft[]
      })
  }
})

export const { updateUserLocation, updateIsTrackingUserLocation } = appSlice.actions

export const aircraftState = (state: any) => state.app.aircraft
export const userState = (state: any) => state.app.userLocation
export const isTrackingUserState = (state: any) => state.app.isTrackingUserLocation
export const cameraState = (state: any) => state.app.camera

export default appSlice.reducer

export const refreshData = createAsyncThunk(
  'app/refreshData',
  async (boundary: { northEast: LatLng, southWest: LatLng }) =>
{
  const box: LocationRegionBox = {
    left: boundary.southWest.longitude,
    right: boundary.northEast.longitude,
    bottom: boundary.southWest.latitude,
    top: boundary.northEast.latitude
  }

  let result = await mapData.refresh(box)
  return result
})
