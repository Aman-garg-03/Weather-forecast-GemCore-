const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');

// Fetch weather data
searchBtn.addEventListener('click', async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    weatherDisplay.innerHTML = `<p class="error">Please enter a city name!</p>`;
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ea5a2075411e9e765465a4866fa38501&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();

    const weatherInfo = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature: ${data.main.temp} °C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Condition: ${data.weather[0].description}</p>
    `;
    weatherDisplay.innerHTML = weatherInfo;

    // Add weather display animation
    weatherDisplay.classList.add('weather-animation');
    setTimeout(() => weatherDisplay.classList.remove('weather-animation'), 1000);
  } catch (error) {
    weatherDisplay.innerHTML = `<p class="error">Error fetching weather data.</p>`;
  }
});

// Background animation for weather display
document.body.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;
  document.body.style.background = `radial-gradient(at ${x}% ${y}%, #83a4d4, #b6fbff)`;
});
