import type { CurrentWeatherResponse } from "../../types/weather";

export const mockWeatherResponse: CurrentWeatherResponse = {
    coord: { lon: -0.1276, lat: 51.5072 },
    weather: [
        { id: 800, main: 'Clear', description: 'clear sky', icon: '01d'},
    ],
    base: 'station',
    main: {
        temp: 15.5,
        feels_like: 14.8,
        temp_min: 14.0,
        temp_max: 17.0,
        pressure: 1013,
        humidity: 72,
    },
    visibility: 10000,
    wind: { speed: 4.1, deg: 220 },
    clouds: { all: 0 },
    dt: 1730649600,
    sys: { country: 'GB', sunrise: 1730612400, sunset: 1730647200 },
    timezone: 0,
    id: 2643743,
    name: 'London',
    cod: 200,
}