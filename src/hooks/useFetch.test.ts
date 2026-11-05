import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useFetch } from './useFetch'
import { mockWeatherResponse } from '../test/fixtures/weather'
import type { CurrentWeatherResponse } from '../types/weather'

describe('useFetch', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('не делает запрос при url === null (idle)', () => {
        const fetchMock = vi.fn()
        vi.stubGlobal('fetch', fetchMock)

        const { result } = renderHook(() =>
            useFetch<CurrentWeatherResponse>(null)
        )

        expect(fetchMock).not.toHaveBeenCalled()
        expect(result.current).toEqual({ data: null, loading: false, error: null })
    })

    it('Делает запрос и возвращает данные loading - success', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve(mockWeatherResponse),
            })
        )

        const { result } = renderHook(() =>
            useFetch<CurrentWeatherResponse>('https://example.com/weather')
        )

        expect(result.current.loading).toBe(true)
        expect(result.current.data).toBeNull()

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(result.current.data).toEqual(mockWeatherResponse)
        expect(result.current.error).toBeNull()
    })

    it('Возвращает error при HTTP ошибке !response.ok', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not found'
            })
        )

        const { result } = renderHook(() =>
            useFetch<CurrentWeatherResponse>('https://example.com/not-found')
        )

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(result.current.data).toBeNull()
        expect(result.current.error).toBe('Error 404: Not found')
    })
})