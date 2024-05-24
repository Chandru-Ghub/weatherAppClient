import { createContext, useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import History from './components/History';
import CurrentGeoLocation from './components/CurrentGeoLocation';
export const myWeather = createContext()
function App() {
  const [Weather,setWeather] = useState()
  console.log('APP>>',Weather)
  return (
    <>
      <myWeather.Provider value={[Weather,setWeather]}>
        <BrowserRouter>
        <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/history' element={<History/>}/>
          </Routes>
        </BrowserRouter>
      </myWeather.Provider>
    </>
  );
}

export default App;
