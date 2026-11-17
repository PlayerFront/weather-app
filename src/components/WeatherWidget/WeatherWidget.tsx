import { useState, useMemo } from "react"
import { useFetch } from "../../hooks/useFetch"
import { useGeolocation } from "../../hooks/useGeolocation"
import { buildWeatherUrl, type WeatherQuery } from "../../utils/buildWeatherUrl"
import type { CurrentWeatherResponse } from "../../types/weather"
import { getTheme } from '../../utils/getTheme'
import { WeatherCard } from "../WeatherCard/WeatherCard"
import './WeatherWidget.css'

export function WeatherWidget() {
    const geo = useGeolocation()
    const [cityInput, setCityInput] = useState('')
    const [submittedCity, setSubmittedCity] = useState<string | null>(null)
    const [activeSource, setActiveSource] = useState<'geo' | 'city' | null>(null)

    const query: WeatherQuery | null = useMemo(() => {
        if (activeSource === 'geo' && geo.coords) {
            return { lat: geo.coords.lat, lon: geo.coords.lon }
        }
        if (activeSource === 'city' && submittedCity) {
            return { city: submittedCity }
        }
        if (!activeSource && geo.coords) {
            return { lat: geo.coords.lat, lon: geo.coords.lon };
        }
        return null
    }, [activeSource, geo.coords, submittedCity])

    const url = buildWeatherUrl(query)
    const { data, loading, error } = useFetch<CurrentWeatherResponse>(url)

    const handleGeoClick = () => {
        setActiveSource('geo')
        geo.requestLocation()
    }

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const trimmed = cityInput.trim()
        if (trimmed) {
            setSubmittedCity(trimmed)
            setActiveSource('city')
            setCityInput('')
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
                    onClick={handleGeoClick}
                    disabled={geo.loading}
                    aria-label="Use my location"
                >
                    {geo.loading ? (
                        <span className="weather-controls__spinner" aria-label="Loading" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="weather-controls__icon"
                            aria-hidden="true"
                        >
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    )}
                </button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={cityInput}
                        onChange={(e) => setCityInput(e.target.value)}
                        placeholder="City"
                        className="weather-input"
                    />
                </form>
            </div>
            {statusMessage && <p className="weather-status">{statusMessage}</p>}
            {!data && !statusMessage && (
                <p className="weather-hint">
                    Enter a city or click
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="weather-controls__icon"
                            aria-hidden="true"
                        >
                            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                    </span>
                    to see the weather
                </p>
            )}

            {data  && <WeatherCard data={data} />}
            {/* Временное явление fakeData для заглушки из-за отсутствия интернета */}
        </div>
    )
}