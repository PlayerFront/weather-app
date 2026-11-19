import { describe, it, expect } from "vitest"
import { getTheme } from './getTheme'

describe('getTheme', () => {
    it('Возвращается тема из группы cloudy для clouds', () => {
        const theme = getTheme('clouds')
        expect(theme).toMatch(/^cloudy-[1-4]$/)
    })

    it('Возвращается тема из группы sunny для clear', () => {
        const theme = getTheme('clear')
        expect(theme).toMatch(/^sunny-[1-2]$/)
    })

    it('Возвращается тема из группы rainy для rain, drizzle, thunderstorm', () => {
        expect(getTheme('rain')).toMatch(/^rainy-[1-3]$/)
        expect(getTheme('drizzle')).toMatch(/^rainy-[1-3]$/)
        expect(getTheme('thunderstorm')).toMatch(/^rainy-[1-3]$/)
    })

    it('Возвращается тема из группы snowy для snow', () => {
        expect(getTheme('snow')).toMatch(/^snowy-[1-2]$/)
    })

    it('Возвращается cloudy по умолчанию для неизвестного значения', () => {
        expect(getTheme('unknown')).toMatch(/^cloudy-[1-4]$/)
    })
})