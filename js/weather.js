/**
 * Weather Module
 * The Crown Palace
 * Fetches and displays current weather for Varanasi using OpenWeatherMap API
 */

(function () {
    'use strict';

    // Configuration
    const API_KEY = '84a44b841c11882179a853ba8a3c8236';
    const CITY = 'Varanasi';
    const LAT = 25.3176;
    const LON = 82.9739;
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`;

    // Cache duration in milliseconds (30 minutes)
    const CACHE_DURATION = 30 * 60 * 1000;

    // Update interval in milliseconds (30 minutes)
    const UPDATE_INTERVAL = 30 * 60 * 1000;

    // DOM Elements
    const weatherWidget = document.getElementById('weatherWidget');
    const weatherIcon = document.getElementById('weatherIcon');
    const weatherTemp = document.getElementById('weatherTemp');
    const weatherCondition = document.getElementById('weatherCondition');

    // Weather icon mapping (OpenWeatherMap icons to descriptions)
    const weatherIcons = {
        '01d': 'https://openweathermap.org/img/wn/01d@2x.png', // Clear sky day
        '01n': 'https://openweathermap.org/img/wn/01n@2x.png', // Clear sky night
        '02d': 'https://openweathermap.org/img/wn/02d@2x.png', // Few clouds day
        '02n': 'https://openweathermap.org/img/wn/02n@2x.png', // Few clouds night
        '03d': 'https://openweathermap.org/img/wn/03d@2x.png', // Scattered clouds
        '03n': 'https://openweathermap.org/img/wn/03n@2x.png',
        '04d': 'https://openweathermap.org/img/wn/04d@2x.png', // Broken clouds
        '04n': 'https://openweathermap.org/img/wn/04n@2x.png',
        '09d': 'https://openweathermap.org/img/wn/09d@2x.png', // Shower rain
        '09n': 'https://openweathermap.org/img/wn/09n@2x.png',
        '10d': 'https://openweathermap.org/img/wn/10d@2x.png', // Rain
        '10n': 'https://openweathermap.org/img/wn/10n@2x.png',
        '11d': 'https://openweathermap.org/img/wn/11d@2x.png', // Thunderstorm
        '11n': 'https://openweathermap.org/img/wn/11n@2x.png',
        '13d': 'https://openweathermap.org/img/wn/13d@2x.png', // Snow
        '13n': 'https://openweathermap.org/img/wn/13n@2x.png',
        '50d': 'https://openweathermap.org/img/wn/50d@2x.png', // Mist
        '50n': 'https://openweathermap.org/img/wn/50n@2x.png'
    };

    // Initialize weather module
    function init() {
        if (!weatherWidget) return;

        // Try to get cached weather first
        const cachedWeather = getCachedWeather();
        if (cachedWeather) {
            displayWeather(cachedWeather);
        }

        // Fetch fresh weather
        fetchWeather();

        // Set up periodic refresh
        setInterval(fetchWeather, UPDATE_INTERVAL);
    }

    // Fetch weather data from API
    async function fetchWeather() {
        try {
            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error(`Weather API error: ${response.status}`);
            }

            const data = await response.json();

            // Cache the weather data
            cacheWeather(data);

            // Display weather
            displayWeather(data);

        } catch (error) {
            console.error('Weather fetch failed:', error);
            displayWeatherFallback();
        }
    }

    // Display weather data
    function displayWeather(data) {
        if (!weatherTemp || !weatherCondition || !weatherIcon) return;

        const temp = Math.round(data.main.temp);
        const condition = data.weather[0].main;
        const iconCode = data.weather[0].icon;
        const iconUrl = weatherIcons[iconCode] || weatherIcons['01d'];

        weatherTemp.textContent = `${temp}°C`;
        weatherCondition.textContent = condition;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = condition;

        // Remove loading state
        weatherWidget.classList.remove('weather-widget--loading');
    }

    // Display fallback when API fails
    function displayWeatherFallback() {
        if (!weatherTemp || !weatherCondition || !weatherIcon) return;

        // Check for cached data first
        const cachedWeather = getCachedWeather();
        if (cachedWeather) {
            displayWeather(cachedWeather);
            return;
        }

        // Show generic fallback
        weatherTemp.textContent = '--°C';
        weatherCondition.textContent = 'Unavailable';
        weatherIcon.src = weatherIcons['01d'];
        weatherIcon.alt = 'Weather unavailable';
    }

    // Cache weather data in localStorage
    function cacheWeather(data) {
        try {
            const cacheData = {
                weather: data,
                timestamp: Date.now()
            };
            localStorage.setItem('heritage_varanasi_weather', JSON.stringify(cacheData));
        } catch (e) {
            console.warn('Could not cache weather data:', e);
        }
    }

    // Get cached weather data if still valid
    function getCachedWeather() {
        try {
            const cached = localStorage.getItem('heritage_varanasi_weather');
            if (!cached) return null;

            const { weather, timestamp } = JSON.parse(cached);

            // Check if cache is still valid
            if (Date.now() - timestamp > CACHE_DURATION) {
                localStorage.removeItem('heritage_varanasi_weather');
                return null;
            }

            return weather;
        } catch (e) {
            console.warn('Could not read cached weather:', e);
            return null;
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
