import React, { useContext, useEffect, useState } from "react";
import { myWeather } from "../App";
import axios from "axios";
import {apiKey2 } from "../api/keys";
import CurrentGeoLocation from "./CurrentGeoLocation";
const WeatherDetails = () => {
  const [Weather,setWeather] = useContext(myWeather);
  const { position } = CurrentGeoLocation();
  const [data,setData] = useState([])
  const [country,setCountry] = useState({})

  let CurrentDate = new Date()
  let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  let day = 1
  let date = CurrentDate.getDate()
  let month = CurrentDate.toString().split(' ')[1]
  let year = CurrentDate.getFullYear()
  console.log(date)
  
  let lat;
  let lon;
  // Get weather of specific geo location

  const getWeather = async () => {

    if (Weather) {
      lat = Weather.lat;
      lon = Weather.lon;
    } else {
      lat = position.latitude;
      lon = position.longitude;
    }
     console.log('lat,lon=>',lat,lon)
   if(lat && lon){
     try {
      let res2 = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?days=7&lat=${lat}&lon=${lon}&key=${apiKey2}`)
      console.log(res2.data)
      setCountry(res2.data)
       setData(res2.data.data)

    } catch (error) {
      console.log(error);
    }
   }

  };
  useEffect(() => {
    getWeather();
  }, [position,Weather]);

  return (
      <div>
      <div>
        <div>
            <p>Country:{country.country_code}</p>
            <img  src={`https://flagsapi.com/${country.country_code}/flat/64.png`} alt="" />
        </div>
        <div>
            <h2>CITY:{country.city_name}</h2>
        </div>
        {data.length?<div>
            <h3>TEMP:{data[0].temp}</h3>
            <h3>DEW:{data[0].dewpt}</h3>

            <h3>Weather: {data[0].weather.description}</h3>
        </div>:''}
        </div>

        <div className="dates">
            <h1>{days[day]}</h1>
            <h2>{date} {month}</h2><span>{year}</span>
            
        </div>
        <div className="weather">
    {
      data.map((a,i)=>
        <div className="card1" key={i}>
           <div className="dates">
            <h1>{days[day < 6 && day !=0 ?day+(i+1):day]}</h1>
            <h2>{a.datetime.split('-')[2]} {month}</h2>
            <span>{a.datetime.split('-')[0]}</span>
        
        </div>
          <p>Weather:{a.weather.description}</p>
          <p>Temp:{a.temp}</p>
          <p>dew:{a.dewpt}</p>
          <p>maxtemp:{a.app_max_temp}</p>
          <div>
            <img src={`https://cdn.weatherbit.io/static/img/icons/${a.weather.icon}.png`} alt="" />
          </div>
          <div>
            <p>{}</p>
          </div>
        </div>
      )
    }
    </div>
      </div>

  );
};

export default WeatherDetails;
