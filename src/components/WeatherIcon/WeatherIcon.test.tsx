import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { WeatherIcon } from "./WeatherIcon"

describe('WeatherIcon', () => {
    it('Рендерится иконка Sunny для Clear', () => {
        render(<WeatherIcon main="clear" />)
        expect(screen.getByTestId('icon-sunny')).toBeInTheDocument()
    })

    it('Рендерится иконка Cloudy для clouds', () => {
        render(<WeatherIcon main="clouds" />)
        expect(screen.getByTestId('icon-cloudy')).toBeInTheDocument()
    })

    it('Рендерится иконка Rainy для drizzle', () => {
        render(<WeatherIcon main="drizzle" />)
        expect(screen.getByTestId('icon-rainy')).toBeInTheDocument()
    })

    it('Рендерится иконка Rainy для rain', () => {
        render(<WeatherIcon main="rain" />)
        expect(screen.getByTestId('icon-rainy')).toBeInTheDocument()
    })

    it('Рендерится иконка Rainy для thunderstorm', () => {
        render(<WeatherIcon main="thunderstorm" />)
        expect(screen.getByTestId('icon-rainy')).toBeInTheDocument()
    })

    it('Рендерится иконка Snowy для snow', () => {
        render(<WeatherIcon main="snow" />)
        expect(screen.getByTestId('icon-snowy')).toBeInTheDocument()
    })

    it('Рендерится Cloudy по умолчанию для неизвестного значения', () => {
        render(<WeatherIcon main="unknown" />)
        expect(screen.getByTestId('icon-cloudy')).toBeInTheDocument()
    })
})