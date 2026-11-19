import { describe, it, expect } from "vitest"
import { getWeatherLabel } from "./getWeatherLabel"

describe('getWeatherLabel', () => {
    it('Возвращается Sunny для clear', () => {
        expect(getWeatherLabel('clear')).toBe('Sunny')
        expect(getWeatherLabel('Clear')).toBe('Sunny')
    })

    it('ВОзвращается Rainy для rain, drizzle, thunderstorm', () => {
        expect(getWeatherLabel('rain')).toBe('Rainy')
        expect(getWeatherLabel('drizzle')).toBe('Rainy')
        expect(getWeatherLabel('thunderstorm')).toBe('Rainy')
    })

    it('Возвращается Snowy для snow', () => {
        expect(getWeatherLabel('snow')).toBe('Snowy')
    })

    it('Возвращается Cloudy для всего остального', () => {
        expect(getWeatherLabel('clouds')).toBe('Cloudy')
        expect(getWeatherLabel('mist')).toBe('Cloudy')
        expect(getWeatherLabel('unknown')).toBe('Cloudy')
    })
})
