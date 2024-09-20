import "./App.css";

export default function App() {
  return (
    <div
      className="app-container"
      style={{ backgroundImage: `url(${"/assets/fog.gif"})` }}
    >
      <div className="searchbar-container">
        <SearchBar />
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

function SearchBar() {
  return (
    <div className="searchbar-wrapper">
      <input className="searchbar" placeholder="Search for a city.."></input>
      <i className="bx bx-search searchbar-btn"></i>
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
        <i class="bx bx-current-location"></i>
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
