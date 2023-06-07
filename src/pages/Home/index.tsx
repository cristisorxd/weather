import React, { useEffect, useState } from "react";
import "./style.css";
import Search from "../../components/Search";
import { useWeatherData } from "../../hooks/useWeatherData";
import WeatherWidget from "../../components/WeatherWidget";

const Home = () => {
  const [location, setLocation] = useState<[number, number]>([0, 0]);
  const [weatherData, loading] = useWeatherData(location[0], location[1]);

  const handleCitySearch = (lat: number, lon: number) => {
    setLocation([lat, lon]);
  };

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setLocation([latitude, longitude]);
            },
            (error) => {
              console.error("Error retrieving geolocation:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error retrieving geolocation:", error);
      }
    };

    fetchCurrentLocation();
  }, []);

  return (
    <div id="home">
      <div className="container">
        <h1>Weather App</h1>
        <Search onLocationClick={handleCitySearch} />
        <WeatherWidget weatherData={weatherData} loading={loading} configId="weather-widget"/>
      </div>
    </div>
  );
};

export default Home;
