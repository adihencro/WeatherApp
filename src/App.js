import './App.css';
import Search from './components/search/search';
import CurrentWeather from './components/current-weather/current-weather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    const CurrentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

    Promise.all([CurrentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({city: searchData.label, ...weatherResponse});
      })
      .catch((err) => console.log(err));
  }
  console.log(currentWeather);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />} 
    </div>
  );
}


export default App;
