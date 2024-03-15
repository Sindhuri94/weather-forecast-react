import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import './App.css';

function App() {
  const apiKey = "e6bc75067aa06abe2c2b0bd5b844b031";
  const [inputCity, setInputCity] = useState("");
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
    axios.get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data.city);
        setForecast(res.data.list.filter(item => item.dt_txt.includes("12:00:00"))); // Filtering forecasts for 12:00:00
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="weather-container">
      <div className="weather-bg">
        <div className="weather-content">
          <h1 className="heading">Weather App</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city name"
              value={inputCity}
              onChange={handleChangeInput}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {Object.keys(data).length > 0 && (
            <div className="weather-forecast">
              <h2 className="forecast-heading">{data?.name}, {data?.country}</h2>
              <div className="forecast-cards">
                {forecast.map((item, index) => (
                  <div className="card" key={index}>
                    <div className="card-body">
                      <h5 className="card-title">{formatDate(item.dt_txt)}</h5>
                      <img
                        className="weather-icon"
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                        alt={item.weather[0].description}
                      />
                      <p className="card-text">{((item.main.temp) - 273.15).toFixed(2)}°C</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
