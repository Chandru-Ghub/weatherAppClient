import React, { useContext, useEffect, useState } from "react";
import "../style/History.css";
import axios from "axios";
import { myWeather } from "../App";
import progress from '../images/progress.gif'
const History = () => {
  const [getCity, setGetCity] = useState([]);
  const [Weather, setWeather] = useContext(myWeather);

  // get weather history from mongoDB data base
  const getHistory = async () => {
    try {
      const response = await axios.get(
        `https://weatherappserver-w46g.onrender.com/get`
      );
      setGetCity(response.data.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getHistory();
  }, [Weather]);

  // weather history calls
  const handleWeather = (city) => {
    let geoLocation = {
      lat: city.lat,
      lon: city.lon,
    };
    setWeather(geoLocation);
  };
  return (
    <div className="data-history">
      {getCity.length?
        getCity.map((city, i) => (
          <div
            key={i}
            className="locations"
            onClick={() => handleWeather(city)}
            style={{ display: "flex" }}
          >
            <div className="flag">
              <img
                src={`https://flagsapi.com/${city.country_code}/flat/64.png`}
                alt=""
              />
            </div>
            <p className="country-code">({city.country_code})</p>
            <p className="country-location">- {city.city_name}</p>
          </div>
        )):<div className="progress2">
          <div>
          <img src={progress} alt="" />
          <div>Loading...</div>
          </div>
        </div>}
    </div>
  );
};

export default History;
