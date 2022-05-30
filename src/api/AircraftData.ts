import { Aircraft, Location2D, Location } from "../Entities";
import axios, { AxiosResponse } from "axios";
import { DataFactoryType, OSAllStateResponse } from "./enums";
import { Region } from "react-native-maps";

// A box defined by two latitudinal values and two longitudinal values
export type LocationRegionBox = {
    left: number,
    top: number,
    right: number,
    bottom: number,
}

export interface MapDataInterface {
    refresh(box: LocationRegionBox): Promise<Location2D[]>
}

export class MapData implements MapDataInterface {
    refresh(box: LocationRegionBox): Promise<Location2D[]> {
        console.debug("returning states")
        return Promise.resolve([]);
    }

    syncRefresh(box: LocationRegionBox): Location2D[] {
        return []
    }
}

class RandomData implements MapDataInterface {
    private states: Location2D[] = new Array(10).fill(new Location(0, 0))

    async refresh(box: LocationRegionBox): Promise<Location2D[]> {
        await new Promise<void>(res => setTimeout(() => { res() }, 1000))
        const hRange = box.right - box.left
        const vRange = box.top - box.bottom

        this.states = this.states.map(() => {
            return {
                lat: Math.random() * vRange + box.bottom,
                lon: Math.random() * hRange + box.left
            }
        })

        return this.states
    }

    syncRefresh(box: LocationRegionBox): Location2D[] {
        const hRange = box.right - box.left
        const vRange = box.top - box.bottom

        this.states = this.states.map(() => {
            return {
                lat: Math.random() * hRange + box.left,
                lon: Math.random() * vRange + box.bottom
            }
        })

        return this.states
    }
}

class AircraftData implements MapDataInterface {
    private aircraftData: Aircraft[] = []
    private lastRefreshTime: number = 0

    constructor () {
        axios.defaults.baseURL = "https://opensky-network.org/api"
        axios.defaults.headers.common['Authorization'] = "Basic ZWxpZ2h0OktnSkhjUHczeHhOR29oWkpaQg=="
    }

    async refresh(box: LocationRegionBox): Promise<Aircraft[]> {
        let response: AxiosResponse = await axios.get(`/states/all?lamin=${box.bottom}&lomin=${box.left}&lamax=${box.top}&lomax=${box.right}`)
        let data: OSAllStateResponse = response.data

        if (data.time > this.lastRefreshTime) {
            this.lastRefreshTime = data.time
            if (data.states) {
            this.aircraftData = data.states
              .map(state => new Aircraft(state))
              .filter(state => state.isAirborne)
            } else {
              this.aircraftData = []
            }
        }

        return this.aircraftData
    }
}

export class MapDataFactory {
    static create(type: DataFactoryType) {
        switch (type) {
            case DataFactoryType.garbage:
                return new RandomData()
            case DataFactoryType.openSky:
                return new AircraftData()
        }
    }
}


