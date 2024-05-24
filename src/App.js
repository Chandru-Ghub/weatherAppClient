import { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home';
export const myWeather = createContext()
function App() {
  const [Weather,setWeather] = useState()
  
  return (
    <div className='app'>
      <myWeather.Provider value={[Weather,setWeather]}>
         <Home/>
      </myWeather.Provider>
    </div>
  );
}

export default App;
