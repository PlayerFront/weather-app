export type WeatherTheme = 
| 'cloudy-1' | 'cloudy-2' | 'cloudy-3' | 'cloudy-4'
| 'sunny-1' | 'sunny-2' 
| 'rainy-1' | 'rainy-2' | 'rainy-3'
| 'snowy-1' | 'snowy-2'

const THEMES_BY_GROUP: Record<string, WeatherTheme[]> = {
  clouds: ['cloudy-1', 'cloudy-2', 'cloudy-3', 'cloudy-4'],
  clear:  ['sunny-1', 'sunny-2'],
  rain:   ['rainy-1', 'rainy-2', 'rainy-3'],
  drizzle: ['rainy-1', 'rainy-2', 'rainy-3'],
  thunderstorm: ['rainy-1', 'rainy-2', 'rainy-3'],
  snow:   ['snowy-1', 'snowy-2'],
}

export function getTheme(weatherMain: string): WeatherTheme {
    const group = weatherMain.toLowerCase()
    const themes = THEMES_BY_GROUP[group] ?? THEMES_BY_GROUP.clouds
    const index = Math.floor(Math.random() * themes.length)
    return themes[index]
}