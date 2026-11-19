import { describe, it, expect } from "vitest"
import { formatDate, formatTime, formatCountry } from "./formatters"

describe('formatters', () => {
    describe('formatDate', () => {
        it('Форматирует timestamp в DD Month YYYY', () => {
            const timestamp = new Date('2019-10-21T12:00:00Z').getTime() / 1000
            expect(formatDate(timestamp)).toBe('21 Oct 2019')
        })
    })

    describe('formatTime', () => {
        it('Форматирует timestamp в HH:MM', () => {
            const timestamp = new Date('2019-10-21T12:00:00Z').getTime() / 1000
            expect(formatTime(timestamp)).toMatch(/\d{2}:\d{2}/)
        })
    })

    describe('formatCountry', () => {
        it('Возвращается полное название страны по коду', () => {
            expect(formatCountry('RU')).toBe('Russia')
            expect(formatCountry('US')).toBe('United States')
            expect(formatCountry('GB')).toBe('United Kingdom')
        })

        it('Возвращается пустая строка, если код не передан', () => {
            expect(formatCountry(undefined)).toBe('')
        })
    })
})