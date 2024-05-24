import axios from 'axios'
import Search from './Search'
import WeatherDetails from './WeatherDetails'
const Home = () => {


  return (
    <div>
      <Search/>
      <WeatherDetails/>
    </div>
  )
}

export default Home