// API Configuration
const API_KEY = 'b6fd43b5a86f428c7f893e15220605b7'; // Chave gratuita do OpenWeatherMap
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherContainer = document.getElementById('weatherContainer');
const forecastContainer = document.getElementById('forecastContainer');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Handle Search
function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        showError('Por favor, digite o nome de uma cidade');
    }
}

// Fetch Weather Data
async function fetchWeatherData(city) {
    try {
        showLoading();
        
        // Fetch current weather
        const weatherResponse = await fetch(
            `${API_BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        
        if (!weatherResponse.ok) {
            throw new Error('Cidade não encontrada');
        }
        
        const weatherData = await weatherResponse.json();
        
        // Fetch forecast data
        const forecastResponse = await fetch(
            `${API_BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        
        const forecastData = await forecastResponse.json();
        
        displayWeather(weatherData);
        displayForecast(forecastData);
        searchInput.value = '';
        
    } catch (error) {
        showError(error.message);
    }
}

// Display Current Weather
function displayWeather(data) {
    const { name, sys, main, weather, wind, clouds } = data;
    
    const weatherHTML = `
        <div class="weather-header">
            <div class="city-info">
                <h2>${name}, ${sys.country}</h2>
                <p>${new Date().toLocaleDateString('pt-BR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                })}</p>
            </div>
            <div class="temperature">${Math.round(main.temp)}°C</div>
        </div>
        
        <div style="text-align: center; margin-bottom: 20px;">
            <p style="font-size: 1.3em; text-transform: capitalize;">${weather[0].description}</p>
            <p style="font-size: 2.5em;">
                ${getWeatherIcon(weather[0].main)}
            </p>
        </div>
        
        <div class="weather-main">
            <div class="weather-detail">
                <label>Sensação Térmica</label>
                <div class="value">${Math.round(main.feels_like)}°C</div>
            </div>
            
            <div class="weather-detail">
                <label>Umidade</label>
                <div class="value">${main.humidity}%</div>
            </div>
            
            <div class="weather-detail">
                <label>Pressão</label>
                <div class="value">${main.pressure} hPa</div>
            </div>
            
            <div class="weather-detail">
                <label>Velocidade do Vento</label>
                <div class="value">${(wind.speed * 3.6).toFixed(1)} km/h</div>
            </div>
            
            <div class="weather-detail">
                <label>Nebulosidade</label>
                <div class="value">${clouds.all}%</div>
            </div>
            
            <div class="weather-detail">
                <label>Visibilidade</label>
                <div class="value">${(data.visibility / 1000).toFixed(1)} km</div>
            </div>
        </div>
    `;
    
    weatherContainer.innerHTML = weatherHTML;
}

// Display Forecast
function displayForecast(data) {
    const dailyForecasts = {};
    
    // Group forecast by day
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString('pt-BR');
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = [];
        }
        dailyForecasts[date].push(item);
    });
    
    let forecastHTML = '<h3>Previsão de 5 Dias</h3><div class="forecast-grid">';
    
    // Show forecast for the next 5 days
    let dayCount = 0;
    for (const date in dailyForecasts) {
        if (dayCount >= 5) break;
        
        const dayForecasts = dailyForecasts[date];
        const avgTemp = Math.round(
            dayForecasts.reduce((sum, f) => sum + f.main.temp, 0) / dayForecasts.length
        );
        const minTemp = Math.round(Math.min(...dayForecasts.map(f => f.main.temp)));
        const maxTemp = Math.round(Math.max(...dayForecasts.map(f => f.main.temp)));
        const mainWeather = dayForecasts[0].weather[0].main;
        
        forecastHTML += `
            <div class="forecast-card">
                <div class="date">${date}</div>
                <div class="icon">${getWeatherIcon(mainWeather)}</div>
                <div class="temp">${avgTemp}°C</div>
                <div style="font-size: 0.85em; opacity: 0.9;">
                    Min: ${minTemp}°C | Max: ${maxTemp}°C
                </div>
                <div class="description">${dayForecasts[0].weather[0].description}</div>
            </div>
        `;
        dayCount++;
    }
    
    forecastHTML += '</div>';
    forecastContainer.innerHTML = forecastHTML;
}

// Get Weather Icon
function getWeatherIcon(weatherMain) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '💨',
        'Squall': '💨',
        'Tornado': '🌪️'
    };
    
    return icons[weatherMain] || '🌤️';
}

// Show Loading State
function showLoading() {
    weatherContainer.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Carregando dados do clima...</p>
        </div>
    `;
    forecastContainer.innerHTML = '';
}

// Show Error Message
function showError(message) {
    weatherContainer.innerHTML = `
        <div class="error-message">
            <p>❌ ${message}</p>
        </div>
    `;
    forecastContainer.innerHTML = '';
}

// Load weather for default city on page load
window.addEventListener('load', () => {
    fetchWeatherData('São Paulo');
});