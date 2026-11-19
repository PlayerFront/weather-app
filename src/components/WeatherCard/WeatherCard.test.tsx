import { describe, it, expect } from "vitest"
import { render, screen } from '@testing-library/react'
import { WeatherCard } from "./WeatherCard"
import { mockWeatherResponse } from "../../test/fixtures/weather"

describe('WeatherCard', () => {
    it('рендерится название города и страна', () => {
        render(<WeatherCard data={mockWeatherResponse} />)
        expect(screen.getByText(/London, United Kingdom/)).toBeInTheDocument()
    })

    it('Рендерится температура', () => {
        render(<WeatherCard data={mockWeatherResponse} />)
        expect(screen.getByText('16')).toBeInTheDocument()
    })

    it('Рендерится описание погоды Sunny Cloudy ....', () => {
        render(<WeatherCard data={mockWeatherResponse} />)
        expect(screen.getByText('Sunny')).toBeInTheDocument()
    })

    it('Рендерится дата', () => {
        render(<WeatherCard data={mockWeatherResponse} />)
        expect(screen.getByText(/03 Nov 2024/)).toBeInTheDocument()
    })
})