import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const lat = 51.5074;
  const lon = 0.1278;
  const api_key = "0e9d339d4f3866ca4aa13b20b8c1313d";

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { name, main, weather } = weatherData;

  return (
    <div>
      <h2>Current Weather for {name}</h2>
      <p>{weather[0].description}</p>
      <p>Temperature: {main.temp} &deg;C</p>
      <p>Feels like: {main.feels_like} &deg;C</p>
      <p>Humidity: {main.humidity}%</p>
    </div>
  );
};

export default Weather;
