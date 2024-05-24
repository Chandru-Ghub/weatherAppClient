import React, { useContext, useEffect, useState } from "react";
import { myWeather } from "../App";
import axios from "axios";
import {apiKey2 } from "../api/keys";
import CurrentGeoLocation from "./CurrentGeoLocation";
import '../style/WeatherDetails.css'
const WeatherDetails = () => {
  const [Weather,setWeather] = useContext(myWeather);
  const { position } = CurrentGeoLocation();
  const [data,setData] = useState([])
  const [country,setCountry] = useState({})

  let CurrentDate = new Date()
  let days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  let day = days[CurrentDate.getDay()]
  let date = CurrentDate.getDate()
  let month = CurrentDate.toString().split(' ')[1]
  let year = CurrentDate.getFullYear()
  console.log(day)
  
  let lat;
  let lon;

  // let dateForecast = new Date
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
      let res2 = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?days=8&lat=${lat}&lon=${lon}&key=${apiKey2}`)
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
      <div className="weather-Details">
      <div className="current-weather">
          <div className="country-location-time">
                  <div className="geo-ctry">
                      <p>{country.country_code}</p>
                      <img  src={`https://flagsapi.com/${country.country_code}/flat/64.png`} alt="" />
                  </div>
                  <div className="dates-now">
                      <div className="DD">
                        <p>{day}</p>
                        <div>{date} {month} {year}</div>
                        <span>{country.timezone}</span>
                      </div>
                      <div className="time">
                          <p>12:00</p>
                          <p>PM</p>
                      </div>
                  </div>
          </div>
{console.log(country)}
          <div className="city-location-data">
                <p>{country.city_name}</p>
                {data.length?<div className="temp-datas">
                    <p>{data[0].temp} °c temp</p>
                    <p>{data[0].dewpt} °c dew</p>
                    <p>{data[0].wind_spd} wind<span class="material-symbols-outlined">
air
</span></p>
                    <div>
                    <img src={`https://cdn.weatherbit.io/static/img/icons/${data[0].weather.icon}.png`} alt="" />
                    <p>{data[0].weather.description}</p>
                    </div>
                </div>:''}
                </div>
           </div>
        <div className="weather">
    {
      data.slice(1).map((a,i)=>
        <div className="card1" key={i}>
           <div className="dates">
            <p>{new Date(a.datetime.split('-')[0], a.datetime.split('-')[1]-1,a.datetime.split('-')[2]).toString().split(' ')[0]}</p> 
            <span>{a.datetime.split('-')[2]} {new Date(a.datetime.split('-')[0], a.datetime.split('-')[1]-1).toString().split(' ')[1]}</span>
           </div>
            <div className="weather">
              <p>{a.temp} °c temp</p>
              <p>{a.dewpt} °c dew</p>
              <p>{a.app_max_temp}°c max-temp</p>
            </div>
          <div>
            <img src={`https://cdn.weatherbit.io/static/img/icons/${a.weather.icon}.png`} alt="" />
            <p>{a.weather.description}</p>
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
