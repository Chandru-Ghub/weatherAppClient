import React, { useContext, useState } from "react";
import axios from "axios";
import "../style/Search.css";
import { myWeather } from "../App";
import { apiKey } from "../api/keys";
const Search = () => {
  const [search, setSearch] = useState("");
  const [getCity, setGetCity] = useState([]);
  const [show, setShow] = useState(false);
  const [Weather, setWeather] = useContext(myWeather);

  const searchCities = async (e) => {
    e.preventDefault()
    setShow(true)
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
      );
      setGetCity(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Get weather
  const handleWeather = (city) => {
    console.log(city.lat);
    setShow(false)
    setSearch('')
    let geoLocation = {
      lat: city.lat,
      lon: city.lon,
    };
    setWeather(geoLocation);
  };

  return (
    <div className="searchData">
      <div className="searchbar">
        <form onSubmit={ searchCities}>
        <input required
      placeholder="Search loaction here"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit"><span class="material-symbols-outlined">
search
</span></button>
        </form>
      </div>
      {show?<div className="suggestions">
        {getCity &&
          getCity.map((city) => (
            <div className="locations"
              onClick={() => handleWeather(city)}
              style={{ display: "flex" }}
            >
                <div className="flag">
                <img
                  src={`https://flagsapi.com/${city.country}/flat/64.png`}
                  alt=""
                />
              </div>
              <p className="country-code">({city.country})</p>
              <p className="country-location">- {city.name} <span>{city.state}</span></p>
              {console.log(city)}
              
            </div>
          ))}
      </div>:''}
    </div>
  );
};

export default Search;
