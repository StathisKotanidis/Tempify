import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
import React from "react";

const apiKey = "20ff8e16ee4a79b95bc295e19a5bf2d1";

const weatherBackgrounds = {
  Ash: "/assets/clear.gif",
  Clear: "/assets/clear.gif",
  Clouds: "/assets/clouds.gif",
  Drizzle: "/assets/drizzle.gif",
  Fog: "/assets/fog.gif",
  Haze: "/assets/haze.gif",
  Humidity: "/assets/humidity.gif",
  Mist: "/assets/mist.gif",
  Rain: "/assets/rain.gif",
  Sand: "/assets/sand-dust.gif",
  Dust: "/assets/sand-dust.gif",
  Smoke: "/assets/smoke.gif",
  Snow: "/assets/snow.gif",
  Squall: "/assets/squall.gif",
  Tornado: "/assets/tornado.gif",
  Thunderstorm: "/assets/thunderstorm.gif",
};

export default function App() {
  const [toggleUi, setToggleUi] = useState(false);
  const [cityName, setCityName] = useState("");
  const [enableApi, setEnableApi] = useState(false);
  const [apiData, setApiData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [toFahrenheit, setToFahrenheit] = useState(false);
  const [error, setError] = useState("");

  const celsiusToFahrenheit = Math.round((9 / 5) * apiData?.main?.temp + 32);
  const weatherCondition = apiData?.weather?.[0]?.main || "Clear";

  function handleCityName(e) {
    const input = e.target.value;
    setCityName(input);

    if (input.length === 0) {
      setToggleUi(false);
    }
  }

  function handleEnableApi() {
    setEnableApi(true);
  }

  function handleToggleUi() {
    setToggleUi(true);
  }

  function handleSearchIcon() {
    setError(""); // NEW
    handleEnableApi();
    handleToggleUi();
  }

  function handleToFahrenheit() {
    setToFahrenheit(true);
  }

  function handleCelsius() {
    setToFahrenheit(false);
  }

  useEffect(() => {
    if (!enableApi) return;

    async function getWeather() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
        );

        if (!res.ok) throw new Error("City not found :( ");

        const data = await res.json();
        setApiData(data);
        setError(""); // NEW

        setIsLoading(false);
      } catch (error) {
        setError(error.message); // Set error message NEW
        setApiData({}); // Clear previous API data on error NEW
      } finally {
        setIsLoading(false); // Stop loading regardless of success or failure NEW
        setEnableApi(false); // Reset API trigger NEW
      }
    }
    getWeather();
    setEnableApi(false);
  }, [enableApi, cityName]); // Dependency array to re-trigger on enableApi or cityName change

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${
          weatherBackgrounds[weatherCondition] || "/assets/clear.gif"
        })`,
      }}
    >
      <div className="searchbar-container">
        <SearchBar
          onCityName={handleCityName}
          onSearchIcon={handleSearchIcon}
        />
        <TemperatureConverter
          onFahrenheit={handleToFahrenheit}
          onCelsius={handleCelsius}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="main-container">
          <LocalTime toggleUi={toggleUi} />
          <CurrentTemperature
            toggleUi={toggleUi}
            apiData={apiData}
            cityName={cityName}
            toFahrenheit={toFahrenheit}
            celsiusToFahrenheit={celsiusToFahrenheit}
          />
          <div className="wind-humidity-container">
            <Humidity toggleUi={toggleUi} apiData={apiData} />
            <Wind toggleUi={toggleUi} apiData={apiData} />
          </div>
        </div>
      )}
    </div>
  );
}

function SearchBar({ onCityName, onSearchIcon }) {
  return (
    <div className="searchbar-wrapper">
      <input
        onChange={onCityName}
        className="searchbar"
        placeholder="Search for a city.."
      ></input>
      <i onClick={onSearchIcon} className="bx bx-search searchbar-btn"></i>
    </div>
  );
}

function TemperatureConverter({ onFahrenheit, onCelsius }) {
  return (
    <p className="temperature-converter-wrapper">
      <span onClick={onCelsius} className="celsius">
        °C
      </span>
      <span className="separator">|</span>
      <span onClick={onFahrenheit} className="fahrenheit">
        °F
      </span>
    </p>
  );
}

function LocalTime({ toggleUi }) {
  function getLocalTime() {
    let localTime = new Date();
    return localTime.toLocaleString();
  }

  return toggleUi ? (
    <div className="local-time">
      <p>{getLocalTime()}</p>
    </div>
  ) : null;
}

function CurrentTemperature({
  toggleUi,
  apiData,
  cityName,
  toFahrenheit,
  celsiusToFahrenheit,
}) {
  return toggleUi ? (
    <div className="temperature-container">
      <img
        src={
          apiData?.weather?.[0]?.icon
            ? `http://openweathermap.org/img/wn/${apiData?.weather[0]?.icon}@2x.png`
            : ""
        }
        alt={apiData?.weather?.[0]?.description}
      ></img>
      <span className="current-temperature">
        {!toFahrenheit && apiData?.main?.temp
          ? `${Math.round(apiData.main.temp)}°C`
          : `${celsiusToFahrenheit} °F`}
      </span>
      <span className="city-wrapper">
        <i className="bx bx-current-location"></i>
        <span className="city">{`${cityName},${apiData?.sys?.country}`}</span>
      </span>
    </div>
  ) : null;
}

function Wind({ toggleUi, apiData }) {
  return toggleUi ? (
    <div className="wind-wrapper">
      <i className="bx bx-wind wind-icon"></i>
      <span className="wind-speed">
        {apiData?.wind?.speed ? apiData.wind.speed : 0} km/h
      </span>
    </div>
  ) : null;
}

function Humidity({ toggleUi, apiData }) {
  return toggleUi ? (
    <div className="humidity-wrapper">
      <img src="assets/humidity.png" alt="humitiy-icon"></img>
      <span className="humidity-percentage">
        {apiData?.main?.humidity ? apiData.main.humidity : 0}%
      </span>
    </div>
  ) : null;
}

function Loader() {
  return (
    <p className="loading">
      <i className="bx bx-loader bx-spin bx-flip-horizontal "></i>
    </p>
  );
}
