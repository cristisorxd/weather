import { useState, useEffect } from "react";
import { geoApi, geoApiUrl } from "../utils/api";

interface City {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

const useCitySearch = () => {
  const [cityOptions, setCityOptions] = useState<City[]>([]);

  const searchCities = async (searchQuery: string) => {
    try {
      const response = await fetch(
        `${geoApiUrl}/?minPopulation=10000&namePrefix=${searchQuery}`,
        geoApi
      );
      const result = await response.json();
      setCityOptions(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    return () => {
      setCityOptions([]);
    };
  }, []);

  return {
    cityOptions,
    searchCities,
  };
};

export default useCitySearch;
