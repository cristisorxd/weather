import React, { useState } from "react";
import "./style.css";
import useCitySearch from "../../hooks/useCitySearch";

interface ISearch {
  onLocationClick: (latitude: number, longitude: number) => void;
}

const Search = ({ onLocationClick }: ISearch) => {
  const [search, setSearch] = useState<string>("");
  const { cityOptions, searchCities } = useCitySearch();

  const handleSearch = async (searchQuery: string) => {
    setSearch(searchQuery);
    searchCities(searchQuery);
  };

  return (
    <>
      <input
        className="search"
        type="text"
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Enter a location"
      />
      <ul className="results">
        {cityOptions?.map((data: any) => {
          return (
            <li
              key={data.id}
              value={data.city}
              onClick={() => onLocationClick(data.latitude, data.longitude)}
            >
              {data.city}, {data.country}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Search;
