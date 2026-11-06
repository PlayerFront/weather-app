const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export type WeatherQuery = 
| { lat: number; lon: number }
| { city: string }

export function buildWeatherUrl(query: WeatherQuery | null): string | null {
    if (query === null) {
        return null
    }

    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

    const params = new URLSearchParams({
        units: 'metric',
        lang: 'ru',
        appid: apiKey,
    })

    if ('city' in query) {
        params.set('q', query.city)
    } else {
        params.set('lat', String(query.lat))
        params.set('lon', String(query.lon))
    }

    return `${BASE_URL}?${params.toString()}`
}