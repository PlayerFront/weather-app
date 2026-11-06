import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useGeolocation } from './useGeolocation'

describe('useGeolocation', () => {
    beforeEach(() => {
        vi.restoreAllMocks()
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('Возвращает координаты при успехе', () => {
        const getCurrentPosition = vi.fn((success) => {
            success({ coords: { latitude: 55.75, longitude: 37.62 } })
        })

        vi.stubGlobal('navigator', {
            ...navigator,
            geolocation: { getCurrentPosition },
        })

        const { result } = renderHook(() => useGeolocation())

        act(() => {
            result.current.requestLocation()
        })

        expect(result.current.coords).toEqual({ lat: 55.75, lon: 37.62 })
        expect(result.current.error).toBeNull()
        expect(result.current.loading).toBe(false)
    })

    it('Возвращает ошибку при отказе code 1', () => {
        const getCurrentPosition = vi.fn((_success, error) => {
            error({ code: 1 })
        })

        vi.stubGlobal('navigator', {
            ...navigator,
            geolocation: { getCurrentPosition },
        })

        const { result } = renderHook(() => useGeolocation())

        act(() => {
            result.current.requestLocation()
        })

        expect(result.current.error).toBe('Доступ к геолокации запрещен')
        expect(result.current.coords).toBeNull()
        expect(result.current.loading).toBe(false)
    })

    it('Возвращает ошибку при таймауте code 3', () => {
        const getCurrentPosition = vi.fn((_success, error) => {
            error({ code: 3 })
        })

        vi.stubGlobal('navigator', {
            ...navigator,
            geolocation: { getCurrentPosition },
        })

        const { result } = renderHook(() => useGeolocation())

        act(() => {
            result.current.requestLocation()
        })

        expect(result.current.error).toBe('Превышено время ожидания')
    })
})