import React, { useContext, useState } from 'react'
import axios from 'axios'
import '../style/Search.css'
import { myWeather } from '../App'
import { apiKey } from '../api/keys'
const Search = () => {
    const [search,setSearch] = useState('')
    const [getCity,setGetCity] = useState([])
    const [Weather,setWeather] = useContext(myWeather)


    const searchCities = async(city) => {
        try {
            const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
            setGetCity(response.data)
            console.log(response.data)
        } catch (error) {
            console.error(error);
        
        }
    }
    // Get weather 
    const handleWeather =(city)=>{
        console.log(city.lat)
        let geoLocation = {
            lat:city.lat,
            lon:city.lon
        }
        setWeather(geoLocation)
    }

  return (
    <div>
        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}  />
        <button onClick={()=>searchCities(search)}>search</button>
            <div className="suggestions">
            {
            getCity&&getCity.map((city)=>
                    <div onClick={()=>handleWeather(city)} style={{display:'flex'}}>
                        <p>{city.name}</p>
                        <p>{city.country}</p>
                        <div className='flag'>
                        <img  src={`https://flagsapi.com/${city.country}/flat/64.png`} alt="" />
                        </div>
                        
                    </div>
            )
        }
            </div>
    </div>
  )
}

export default Search