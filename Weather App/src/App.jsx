import './App.css'
import { useState } from 'react';
import { useLocationStore } from './store/useLocationStore';

const App = () => {
  const [currentForecast, setCurrentForecast] = useState(undefined)
  const [dailyForecast, setDailyForecast] = useState(undefined)
  const [position] = useLocationStore((state) => [state.position]);

  const getWeather = async () => {
    console.log(position);
    const apiKey = import.meta.env.VITE_API_KEY;
    const currentURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      position.lat +
      "&lon=" +
      position.lng +
      "&units=metric&appid=" +
      apiKey;
    const currentResponse = await fetch(currentURL);
    const currentResult = await currentResponse.json();
    setCurrentForecast(currentResult); 
    console.log(currentResult);   
    
  }

  return (
      <div className='search-container'>
        <h3>Weather App</h3>
        <button onClick={() => getWeather()}>Get Weather</button>
      
        {currentForecast && (

        <article>
            <h3>{currentForecast.city.name}</h3>
            <p>
              In {currentForecast.name} it is currently {" "}
              {currentForecast.list[0].main.temp} °C </p>
            <p>Sunrise: {currentForecast.city.sunrise}</p>
            <p>Sunset: {currentForecast.city.sunset}</p>
            <p>Population: {currentForecast.city.population}</p>
          </article>
        )}

      </div>
      

  )
}

export default App
