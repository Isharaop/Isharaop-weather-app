const apiKey = '8854580cecd0abc1007951a0052a87f5'; // Replace with your OpenWeatherMap API key
const cities = [
  { name: 'New York', id: '5128581' },
  { name: 'London', id: '2643743' },
  { name: 'Tokyo', id: '1850147' },
  { name: 'Colombo', id: '1248991' },
  { name: 'Dubai', id: '292223' },
];

// Function to fetch weather data
async function fetchWeather(cityId) {
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

// Function to display weather data dynamically
function displayWeather(cityName, weatherData) {
  const weatherContainer = document.getElementById('weather-display');
  const videoBackground = document.getElementById('video-background');

  if (!weatherData) {
    weatherContainer.innerHTML = `<p>Failed to load weather data for ${cityName}.</p>`;
    return;
  }

  const { main, weather, wind } = weatherData;

  // Set background video based on weather condition
  const weatherDescription = weather[0].main.toLowerCase();
  let videoSrc = 'videos/default.mp4';
  if (weatherDescription.includes('rain')) {
    videoSrc = 'videos/rain.mp4';
  } else if (weatherDescription.includes('cloud')) {
    videoSrc = 'videos/clouds.mp4';
  } else if (weatherDescription.includes('clear')) {
    videoSrc = 'videos/clear.mp4';
  }
  videoBackground.src = videoSrc;

  // Update weather information
  weatherContainer.innerHTML = `
    <h3 style="text-shadow: 2px 2px 4px black;">Weather in ${cityName}</h3>
    <p style="text-shadow: 2px 2px 4px black;">Temperature: ${main.temp} °C</p>
    <p style="text-shadow: 2px 2px 4px black;">Weather: ${weather[0].description}</p>
    <p style="text-shadow: 2px 2px 4px black;">Wind Speed: ${wind.speed} m/s</p>
  `;
}

// Function to handle button clicks
function handleCityClick(city) {
  fetchWeather(city.id).then((data) => displayWeather(city.name, data));
}

// Dynamically create buttons for cities
window.onload = () => {
  const buttonContainer = document.getElementById('button-container');
  cities.forEach((city) => {
    const button = document.createElement('button');
    button.textContent = city.name;
    button.className = 'city-button';
    button.onclick = () => handleCityClick(city);
    buttonContainer.appendChild(button);
  });
};
