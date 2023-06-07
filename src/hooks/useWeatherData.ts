import { useEffect, useState } from 'react';
import { weatherApiKey, weatherApiUrl } from '../utils/api';

export interface WeatherData {
    name: string;
    main: {
      feels_like: number;
      humidity: number;
      temp: number;
      pressure: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
      icon: string;
      main: string;
    }[];
}

export const useWeatherData = (lat: number, lon: number): [WeatherData | null, boolean] => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${weatherApiUrl}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}`);
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);


  return [weatherData, loading];
};
