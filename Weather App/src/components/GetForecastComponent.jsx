import { useState } from 'react';

export const GetForecast = () => {
    const [dailyForecast, setDailyForecast] = useState(undefined)
    const [position] = useLocationStore((state) => [state.position]);
  
    const getForecast = async () => {
      console.log(position);
      const apiKey = import.meta.env.VITE_API_KEY;
  
      const URL =
      "api.openweathermap.org/data/2.5/forecast?lat=" +
      position.lat +
      "&lon=" +
      position.lng +
      "&units=metric&appid=" +
      apiKey;
    const Response = await fetch(URL);
    const Result = await Response.json();
    setDailyForecast(Result); 
    console.log(dailyResult);   
    
    
    }
  
    return (
      <div className='Forecast'>
        <h3>5 day Forecast</h3>
        <p>Look at the Weather Prognosis</p>
        <button onClick={() => getForecast()}>Get Weather Forecast</button>
        {dailyForecast && (
          <article>
            <h3>{dailyForecast.city.name}</h3>
            <p>
              In {dailyForecast.name} it is currently {" "}
              {dailyForecast.main.temp} °C </p>
            <p>Sunrise: {dailyForecast.city.sunrise}</p>
            <p>Sunset: {dailyForecast.city.sunset}</p>
            <p>Population: {dailyForecast.city.population}</p>
        </article>
        )}
      </div>
    )
  }