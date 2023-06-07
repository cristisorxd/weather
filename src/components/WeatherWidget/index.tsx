import React, { useState } from "react";
import { WeatherData } from "../../hooks/useWeatherData";
import "./style.css";
import {
  convertKelvinToCelsius,
  convertKelvinToFahrenheit,
} from "../../utils/helpers";

interface IWidget {
  weatherData: WeatherData | null;
  loading: boolean;
  configId: string;
}

const WeatherWidget: React.FC<IWidget> = ({
  weatherData,
  loading,
  configId,
}) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!weatherData) {
    return <div>No weather data available</div>;
  }

  const { name, main, wind, weather } = weatherData;

  const temperature = isCelsius
    ? Math.round(convertKelvinToCelsius(main?.temp || 0))
    : Math.round(convertKelvinToFahrenheit(main?.temp || 0));
  return (
    <div id={configId}>
      <div className="widget">
        <div className="info-top">
          <span>
            <p className="city">{name}</p>
            <p className="description">{weather[0]?.main}</p>
          </span>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
            />
          </div>
        </div>
        <div className="info-bottom">
          <div className="temp">
            <p className="degrees">
              {temperature}
              {isCelsius ? "°C" : "°F"}
            </p>
            <p className="toggle" onClick={toggleTemperatureUnit}>
              Show temperature in: <span>{isCelsius ? "°C" : "°F"}</span>{" "}
            </p>
          </div>
          <div className="details">
            <span>Details</span>
            <span className="row">
              <span>Feels like</span>
              <span>
                {temperature}
                {isCelsius ? "°C" : "°F"}
              </span>
            </span>
            <span className="row">
              <span>Wind</span>
              <span>{Math.round(wind?.speed)} m/s</span>
            </span>
            <span className="row">
              <span>Humidity</span>
              <span>{main?.humidity}%</span>
            </span>
            <span className="row">
              <span>Pressure</span>
              <span>{main?.pressure} hPa</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
