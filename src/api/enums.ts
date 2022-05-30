export type OSAllStateResponse = {
    time: number,
    states: any[]
}

export enum OSAllAircraftResponseKey {
    transponderIdHex = 0,
    callSign,
    originCountry,
    lastPositionTimeUnix,
    lastContactTimeUnix,
    longitude,
    latitude,
    barometricAltitude,
    nully,
    isOnGround,
    velocity,
    trueTrack,
    verticalRate,
    sensors,
    geometricAltitude,
    squawkCode,
    isSpecialPurpose,
    positionSource
}

enum OSPositionSource {
    ADSB = 0,
    ASTERIX,
    MLAT,
    FLARM
}

export enum DataFactoryType {
    garbage,
    openSky
}
