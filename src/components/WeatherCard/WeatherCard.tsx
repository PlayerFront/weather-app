import type { CurrentWeatherResponse } from "../../types/weather";
import { formatCountry, formatDate, formatTime } from "../../utils/formatters";
import { getWeatherLabel } from "../../utils/getWeatherLabel";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";
import './WeatherCard.css'

interface WeatherCardProps {
    data: CurrentWeatherResponse
}

export function WeatherCard({ data }: WeatherCardProps) {
    return (
        <div className="weather-card">
            <button className="weather-card__dropdown">
                Today
                <span>
                    <svg viewBox="0 0 16 9.71423" width="12" height="8" fill="currentColor" className="dropdown-arrow">
                        <rect width="11.323250" height="2.414738" x="0" y="0" rx="1.207369" transform="matrix(-0.707107,0.707107,-0.707107,-0.707107,16,1.7074)" />
                        <rect width="11.323250" height="2.414738" x="0" y="0" rx="1.207369" transform="matrix(0.707107,0.707107,0.707107,-0.707107,0,1.7074)" />
                    </svg>
                </span>
            </button>
            <div className="weather-card__main">
                <WeatherIcon main={data.weather[0].main} className="weather-card__icon" />
                <span className="weather-card__temp-wrapper">
                    <span className="weather-card__temp-value">
                        {Math.round(data.main.temp)}
                    </span>
                    <svg
                        viewBox="0 0 15 15"
                        fill="currentColor"
                        className="weather-card__degree-icon"
                    >
                        <path d="M0 7.48072C0 5.42416 0.738342 3.66324 2.21503 2.19794C3.69171 0.732648 5.46632 0 7.53886 0C9.58549 0 11.3407 0.732648 12.8044 2.19794C14.2681 3.66324 15 5.42416 15 7.48072C15 9.53728 14.2681 11.3046 12.8044 12.7828C11.3407 14.2609 9.58549 15 7.53886 15C5.49223 15 3.72409 14.2609 2.23446 12.7828C0.744819 11.3046 0 9.53728 0 7.48072ZM3.65285 7.48072C3.65285 8.56041 4.0285 9.47301 4.77979 10.2185C5.55699 10.9897 6.47668 11.3753 7.53886 11.3753C8.60104 11.3753 9.52073 10.9897 10.2979 10.2185C11.0751 9.4473 11.4637 8.5347 11.4637 7.48072C11.4637 6.42674 11.0751 5.52057 10.2979 4.76221C9.52073 4.00386 8.60104 3.62468 7.53886 3.62468C6.45078 3.62468 5.53109 3.99743 4.77979 4.74293C4.0285 5.48843 3.65285 6.40103 3.65285 7.48072Z" fillRule="nonzero" />
                    </svg>
                </span>
            </div>

            <h2 className="weather-card__desc">
                {getWeatherLabel(data.weather[0].main)}
            </h2>
            <p className="weather-card__city">
                {data.name}, {formatCountry(data.sys?.country)}
            </p>
            <p className="weather-card__date">
                {formatDate(data.dt)} 
            </p>

            <div className="weather-card__footer-info">
                <span>Feels like {Math.round(data.main.feels_like)}°</span>
                <span className="weather-card__separator">|</span>
                <span>Sunset 
                    {' '}
                    {formatTime(data.sys.sunset)}
                </span>
            </div>
        </div>
    )
}