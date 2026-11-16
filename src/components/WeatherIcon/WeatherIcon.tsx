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

    if (condition === 'clear') return <SunnyIcon {...props} />
    if (condition === 'rain' || condition === 'drizzle') return <RainyIcon {...props} />
    if (condition === 'snow') return <SnowyIcon {...props} />
    return <CloudyIcon {...props} />
}