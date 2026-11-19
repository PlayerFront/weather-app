import { CloudyIcon } from './icons/CloudyIcon'
import { SunnyIcon } from './icons/SunnyIcon'
import { RainyIcon } from './icons/RainyIcon'
import { SnowyIcon } from './icons/SnowyIcon'

interface WeatherIconProps {
  main: string;
  className?: string;
}

export function WeatherIcon({ main, className }: WeatherIconProps) {
    const condition = main.toLowerCase()
    const props = { 
        className, 
        'aria-hidden': true as const }

    if (condition === 'clear') return <SunnyIcon {...props} data-testid="icon-sunny" />
    if (condition === 'rain' || condition === 'drizzle' || condition === 'thunderstorm') return <RainyIcon {...props} data-testid="icon-rainy"/>
    if (condition === 'snow') return <SnowyIcon {...props} data-testid="icon-snowy"/>
    return <CloudyIcon {...props} data-testid="icon-cloudy"/>
}