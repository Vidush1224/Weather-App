        const API_KEY = 'a3f7de464cd9e7e5848da7907ca96638';
        const searchBtn = document.getElementById('searchBtn');
        const cityInput = document.getElementById('cityInput');
        const weatherInfo = document.getElementById('weatherInfo');
        const loading = document.getElementById('loading');
        const error = document.getElementById('error');

        const weatherIcons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '🌫️',
            'Haze': '🌫️',
            'Dust': '🌫️',
            'Fog': '🌫️',
            'Sand': '🌫️',
            'Ash': '🌫️',
            'Squall': '💨',
            'Tornado': '🌪️'
        };

        async function getWeather(city) {
            const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
            
            try {
                loading.classList.add('active');
                weatherInfo.classList.remove('active');
                error.classList.remove('active');

                console.log('Fetching weather for:', city);
                console.log('API URL:', API_URL);

                const response = await fetch(API_URL);
                const data = await response.json();
                
                console.log('API Response:', data);
                
                if (!response.ok) {
                    if (data.cod === '401') {
                        throw new Error('Invalid API key. Please check your API key or wait 10-30 minutes for activation.');
                    } else if (data.cod === '404') {
                        throw new Error('City not found. Please check the city name.');
                    } else {
                        throw new Error(data.message || 'Something went wrong');
                    }
                }

                displayWeather(data);
            } catch (err) {
                console.error('Error:', err);
                error.textContent = `❌ ${err.message}`;
                error.classList.add('active');
            } finally {
                loading.classList.remove('active');
            }
        }

        function displayWeather(data) {
            document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('description').textContent = data.weather[0].description;
            document.getElementById('feelsLike').textContent = `${Math.round(data.main.feels_like)}°C`;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
            document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
            
            const weatherMain = data.weather[0].main;
            document.getElementById('weatherIcon').textContent = weatherIcons[weatherMain] || '🌈';
            
            weatherInfo.classList.add('active');
        }

        searchBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            }
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = cityInput.value.trim();
                if (city) {
                    getWeather(city);
                }
            }
        });

        getWeather('New Delhi');