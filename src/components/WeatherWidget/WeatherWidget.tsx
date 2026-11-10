import { useState, useMemo } from "react"
import { useFetch } from "../../hooks/useFetch"
import { useGeolocation } from "../../hooks/useGeolocation"
import { buildWeatherUrl, type WeatherQuery } from "../../utils/buildWeatherUrl"
import type { CurrentWeatherResponse } from "../../types/weather"
import { getTheme } from '../../utils/getTheme'
import './WeatherWidget.css'

export function WeatherWidget() {
    const geo = useGeolocation()
    const [cityInput, setCityInput] = useState('')
    const [submittedCity, setSubmittedCity] = useState<string | null>(null)

    const query: WeatherQuery | null = useMemo(() => {
        if (geo.coords) {
            return { lat: geo.coords.lat, lon: geo.coords.lon }
        }
        if (submittedCity) {
            return { city: submittedCity }
        }
        return null
    }, [geo.coords, submittedCity])

    const url = buildWeatherUrl(query)
    const { data, loading, error } = useFetch<CurrentWeatherResponse>(url)

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmed = cityInput.trim()
        if (trimmed) {
            setSubmittedCity(trimmed)
        }
    }

    const theme = useMemo(() => {
        if (!data) return 'cloudy-1'
        return getTheme(data.weather[0].main)
    }, [data])

    let statusMessage: string | null = null
    if (geo.loading) statusMessage = 'Detecting location...'
    else if (geo.error) statusMessage = geo.error
    else if (loading) statusMessage = 'Loading weather...'
    else if (error) statusMessage = `Error: ${error}`

    return (
        <div className={`weather-app theme-${theme}`}>  
            <div className="weather-controls">
                <button
                    type="button"
                    onClick={geo.requestLocation}
                    disabled={geo.loading}
                >
                    {geo.loading ? '...' : '📍'}
                </button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        placeholder="City"
                    />
                </form>
            </div>
            {statusMessage && <p className="weather-status">{statusMessage}</p>}

            {/* {data && <WeatherCard data={data} />} */}
        </div>
    )
}