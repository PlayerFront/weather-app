import { useState, useEffect } from "react"


interface UseFetchResult<T> {
    data: T | null
    loading: boolean
    error: string | null
}

export function useFetch<T>(url: string | null): UseFetchResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (url === null) {
            queueMicrotask(() => {
                setData(null)
                setLoading(false)
                setError(null)
            })
            return
        }

        const controller = new AbortController()

        async function fetchData() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url!, { signal: controller.signal })

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }

                const json: T = await response.json()
                setData(json)
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return
                }
                setError(err instanceof Error ? err.message : 'Unknown error')
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            controller.abort()
        }

    }, [url])

    return { data, loading, error }
}