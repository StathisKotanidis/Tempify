import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

const apiKey = "20ff8e16ee4a79b95bc295e19a5bf2d1";

export default function App() {
  const [cityName, setCityName] = useState("");
  const [enableApi, setEnableApi] = useState(false);

  function handleCityName(e) {
    setCityName(e.target.value);
  }

  function handleEnableApi() {
    setEnableApi(true);
  }

  useEffect(() => {
    if (!enableApi) return; // only fetch if enable api is true
    async function getWeather() {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching the weather");

        const data = await res.json();
        console.log(data);
        console.log(data.main.temp); // temperature , Math.ceil()
        console.log(data.wind.speed); // wind speed
        console.log(data.main.humidity); // humidity percentage
        console.log(data.weather[0].icon); // icon of corresponding weather result
      } catch (error) {
        console.error(error);
      }
    }
    getWeather();
    setEnableApi(false);
  }, [enableApi, cityName]); // Dependency array to re-trigger on enableApi or cityName change

  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${"/assets/fog.gif"})` }}
    >
      <div className="searchbar-container">
        <SearchBar onCityName={handleCityName} onEnableApi={handleEnableApi} />
        <TemperatureConverter />
      </div>
      <LocalTime />
      <CurrentTemperature />
      <div className="wind-humidity-container">
        <Humidity />
        <Wind />
      </div>
    </div>
  );
}

function SearchBar({ onCityName, onEnableApi }) {
  return (
    <div className="searchbar-wrapper">
      <input
        onChange={onCityName}
        className="searchbar"
        placeholder="Search for a city.."
      ></input>
      <i onClick={onEnableApi} className="bx bx-search searchbar-btn"></i>
    </div>
  );
}

function TemperatureConverter() {
  return (
    <p className="temperature-converter-wrapper">
      <span className="celsius">°C</span>
      <span className="separator">|</span>
      <span className="fahrenheit">°F</span>
    </p>
  );
}

function LocalTime() {
  return (
    <p className="local-time">
      Friday, 20 September 2024 | Local time: 15:43 PM
    </p>
  );
}

function CurrentTemperature() {
  return (
    <div className="temperature-container">
      <img src="./rain.png" alt=" weather-image"></img>
      <span className="current-temperature">25°C</span>
      <span className="city-wrapper">
        <i className="bx bx-current-location"></i>
        <span className="city">Miami</span>
      </span>
    </div>
  );
}

function Wind() {
  return (
    <div className="wind-wrapper">
      <i className="bx bx-wind wind-icon"></i>
      <span className="wind-speed">5.5 km/h</span>
    </div>
  );
}

function Humidity() {
  return (
    <div className="humidity-wrapper">
      <img src="assets/humidity.png" alt="humitiy-icon"></img>
      <span className="humidity-percentage">60%</span>
    </div>
  );
}
