import { useState, useCallback } from "react";

interface Coords {
    lat: number
    lon: number
}

interface UseGeolocationResult {
    coords: Coords | null
    loading: boolean
    error: string | null
    requestLocation: () => void
}

export function useGeolocation(): UseGeolocationResult {
    const [coords, setCoords] = useState<Coords | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const requestLocation = useCallback(() => {
        if(!('geolocation' in navigator)) {
            setError('Геолокация не поддерживается')
            return
        }

        setLoading(true)
        setError(null)

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                })
                setLoading(false)
            },
            (err) => {
                const messages: Record<number, string> = {
                    1: 'Доступ к геолокации запрещен',
                    2: 'Местоположение недоступно',
                    3: 'Превышено время ожидания',
                }
                setError(messages[err.code] ?? 'Неизвестная ошибка геолокации')
                setLoading(false)
            }
        )
    }, [])

    return { coords, loading, error, requestLocation }
}