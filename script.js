const apiKey = "23a301352d954897a6d91505262104";
const input = document.getElementById("cityInput");
const suggestions = document.getElementById("suggestions");
const weatherDiv = document.getElementById("weather");

// Fetch suggestions
input.addEventListener("input", async () => {
  const query = input.value;
  if (query.length < 2) {
    suggestions.innerHTML = "";
    return;
  }

  const res = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${query}`,
  );
  const data = await res.json();

  suggestions.innerHTML = "";
  data.forEach((city) => {
    const div = document.createElement("div");
    div.textContent = `${city.name}, ${city.country}`;
    div.onclick = () => {
      input.value = city.name;
      suggestions.innerHTML = "";
      getWeather(city.name);
    };
    suggestions.appendChild(div);
  });
});

// Fetch weather
async function getWeather(city) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`,
  );
  const data = await res.json();

  const weather = data.current;
  const location = data.location;

  weatherDiv.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <img src="https:${weather.condition.icon}" alt="icon">
        <div class="temp">${weather.temp_c}°C</div>
        <div>${weather.condition.text}</div>
        <div class="details">
          <span>💧 ${weather.humidity}%</span>
          <span>💨 ${weather.wind_kph} km/h</span>
        </div>
      `;

  changeBackground(weather.temp_c, weather.is_day);
}

// Dynamic background
function changeBackground(temp, isDay) {
  if (!isDay) {
    document.body.style.background =
      "linear-gradient(135deg, #141E30, #243B55)";
  } else if (temp > 30) {
    document.body.style.background =
      "linear-gradient(135deg, #f7971e, #ffd200)";
  } else if (temp > 20) {
    document.body.style.background =
      "linear-gradient(135deg, #56CCF2, #2F80ED)";
  } else {
    document.body.style.background =
      "linear-gradient(135deg, #83a4d4, #b6fbff)";
  }
}
