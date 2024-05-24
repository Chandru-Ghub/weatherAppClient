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
  const [show, setShow] = useState(false);
  const [history, setHistory] = useState(false);
  const [Weather, setWeather] = useContext(myWeather);

  const searchCities = async (e) => {
    e.preventDefault()
    setShow(true)
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
      );
      setGetCity(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Get weather
  const handleWeather = async(city) => {
    setShow(false)
    setSearch('')
    let geoLocation = {
      lat: city.lat,
      lon: city.lon,
    };
    setWeather(geoLocation);
    let res = await axios.post('https://weatherappserver-w46g.onrender.com/data',{country_code:city.country,lat:city.lat,lon:city.lon,city_name:city.name})
    console.log(res.data)
  };

  return (
    <div className="searchData">
        <div className={history?"historybarshow":"historybarhide"}>
            <History/>
        </div>
      <div className="searchbar">
        <form onSubmit={ searchCities}>
        <input required
      placeholder="Search loaction here"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit"><span className="material-symbols-outlined">
search
</span></button>
        </form>
      </div>
      {show?<div className="suggestions">
        {getCity &&
          getCity.map((city,i) => (
            <div className="locations" key={i}
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
              
            </div>
          ))}
      </div>:''}
      <span onClick={()=>setHistory(!history)} className="material-symbols-outlined history">
history
</span>
    </div>
  );
};

export default Search;
