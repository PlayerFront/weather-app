export function getWeatherLabel(main: string): string {
    const condition = main.toLowerCase()
    if (condition === 'clear') return 'Sunny'
    if (condition === 'rain' || condition === 'drizzle' || condition === 'thunderstorm') return 'Rainy'
    if (condition === 'snow') return 'Snowy'
    return 'Cloudy'
}