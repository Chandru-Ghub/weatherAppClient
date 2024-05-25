import React, { useContext, useState } from "react";
import axios from "axios";
import "../style/Search.css";
import "../style/History.css";
import { myWeather } from "../App";
import { apiKey } from "../api/keys";
import History from "./History";
const Search = () => {
  const [search, setSearch] = useState("");
  const [getCity, setGetCity] = useState([]);
  const [show, setShow] = useState(true);
  const [history, setHistory] = useState(false);
  const [Weather, setWeather] = useContext(myWeather);

  // get cities from the open weather API
  const searchCities = async (e) => {
    let value = e.target.value
    setSearch(value)
    setShow(true);
    if(value.trim()!== ''){
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`
        );
        let filteredDate = response.data.filter((item)=>item.name.toLowerCase().includes(value.toLowerCase()))
        setGetCity(filteredDate);
        console.log(filteredDate)
      } catch (error) {
        console.error(error);
      }
    }
    else{
      setShow(false)
    }
  };

  // Get weather
  const handleWeather = async (city) => {
    setShow(false);
    setSearch("");
    console.log(city)
    let geoLocation = {
      lat: city.lat,
      lon: city.lon,
    };

    // store aearched data in mongoDB data base
    setWeather(geoLocation);
    let res = await axios.post(
      "https://weatherappserver-w46g.onrender.com/data",
      {
        country_code: city.country,
        lat: city.lat,
        lon: city.lon,
        city_name: city.name,
      }
    );
    console.log(res.data);
  };

  return (
    <div className="searchData">
      <div className={history ? "historybarshow" : "historybarhide"}>
        <History />
      </div>
      <div className="searchbar">
        <form>
          <input
            required
            placeholder="Search loaction here"
            type="text"
            value={search}
            onChange={searchCities}
          />
          <button type="submit">
            <span className="material-symbols-outlined">search</span>
          </button>
        </form>
      </div>
      {show ? (
        <div className="suggestions">
          {getCity &&
            getCity.map((city, i) => (
              <div
                className="locations"
                key={i}
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
                <p className="country-location">
                  - {city.name} <span>{city.state}</span>
                </p>
              </div>
            ))}
        </div>
      ) : (
        ""
      )}
      <span title="search history"
        onClick={() => setHistory(!history)}
        className="material-symbols-outlined history"
      >
        history
      </span>
    </div>
  );
};

export default Search;
