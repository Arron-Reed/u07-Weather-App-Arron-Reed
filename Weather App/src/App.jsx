import './App.css'
import { useState } from 'react';
import { useLocationStore } from './store/useLocationStore';

const App = () => {
  const [forecast, setForecast] = useState(undefined)
  const [position] = useLocationStore((state) => [state.position]);

  const getWeather = async () => {
    console.log(position);

    const apiKey = import.meta.env.VITE_API_KEY;

    const URL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
      position.lat +
      "&lon=" +
      position.lng +
      "&units=metric&appid=" +
      apiKey;
    const response = await fetch(URL);
    const result = await response.json();
    setForecast(result); 
    console.log(result);    
  }

  return (
    <div className='App'>
      <h3>Weather Now</h3>
      <p>Check out our weather app</p>
      <button onClick={() => getWeather()}>Get Weather</button>
      {forecast && (
        <article>
          <h3>{forecast.name}</h3>
          <p>
            In {forecast.name} it is currently {" "}
            {forecast.main.temp} °C 
          </p>
      </article>
      )}
    </div>
  )
}

export default App
