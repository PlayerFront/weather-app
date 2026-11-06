План проекта «Weather App»
<!-- Шаг 1. Подготовка

Регистрация на OpenWeather, получение API-ключа.

npm create vite@latest weather-app -- --template react-ts.

Установка зависимостей: vitest, @testing-library/react, @testing-library/jest-dom, jsdom. -->
<!-- 
Шаг 2. Окружение

Создать .env с VITE_OPENWEATHER_API_KEY.

Проверить .gitignore (.env не коммитится).

Добавить типы в src/vite-env.d.ts (ImportMetaEnv). -->
<!-- 
Шаг 3. Типизация API

src/types/weather.ts: WeatherCondition, CurrentWeatherResponse (coord, weather[], main, wind, name, dt). -->

<!-- Шаг 4. Хук useFetch<T>

Сигнатура: useFetch<T>(url: string | null).

Возврат: { data, loading, error }.

Внутренние состояния: idle / loading / success / error.

url === null → запрос не выполняется. -->

<!-- Шаг 5. Тесты хука

Мок fetch через vi.stubGlobal.

Кейсы: idle, loading→success, loading→error.

Фикстура с ответом API. -->

Шаг 6. Геолокация + fallback

Кнопка «Моё местоположение» → navigator.geolocation.getCurrentPosition.

Успех → запрос по lat/lon.

Отказ (PERMISSION_DENIED) → показать поле ручного ввода города.

Автозапрос геолокации при загрузке не делать.

Шаг 7. Компонент виджета погоды

Формирование URL (по координатам или по q).

Отображение: город, температура (units=metric), описание, иконка (.../img/wn/{icon}@2x.png), влажность, ветер.

Состояния loading / error / success.

Шаг 8. Тесты компонента

Рендер с замоканным useFetch.

Проверка полей (город, температура, иконка).

Тест fallback: мок getCurrentPosition с PERMISSION_DENIED → появилось поле ввода.

Шаг 9. Финализация

npm run build, проверка прод-сборки.

README: стек, скриншоты, инструкция по .env.

(Опционально) Capacitor + @capacitor/geolocation для APK.