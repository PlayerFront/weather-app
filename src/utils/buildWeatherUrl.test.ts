import { describe, it, expect, beforeEach, vi } from 'vitest'
import { buildWeatherUrl } from './buildWeatherUrl'

describe('buildWeatherUrl', () => {
    beforeEach(() => {
        vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'test_key')
    })

    it('Возвращает null при query === null', () => {
        expect(buildWeatherUrl(null)).toBeNull()
    })

    it('Строит URL по городу', () => {
        const url = buildWeatherUrl({ city: 'London' })
        expect(url).toContain('q=London')
        expect(url).toContain('units=metric')
        expect(url).toContain('appid=test_key')
    })

    it('Строит URL по координатам', () => {
        const url = buildWeatherUrl({ lat: 55.75, lon: 37.62 })
        expect(url).toContain('lat=55.75')
        expect(url).toContain('lon=37.62')
    })

    it('Кодирует город с пробелом', () => {
        const url = buildWeatherUrl({ city: 'New York' })
        expect(url).toContain('q=New+York')
    })

    it('Содержится lang=ru', () => {
        const url = buildWeatherUrl({ city: 'New York' })
        expect(url).toContain('lang=ru')
    })
})