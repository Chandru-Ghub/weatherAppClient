import { createContext, useState } from 'react';
import './App.css';
import WeatherDetails from './components/WeatherDetails';
import Search from './components/Search';
export const myWeather = createContext()
function App() {
  const [Weather,setWeather] = useState()
  
  return (
    <div className='app'>
      <myWeather.Provider value={[Weather,setWeather]}>
      <Search/>
      <WeatherDetails/>
      </myWeather.Provider>
    </div>
  );
}

export default App;
