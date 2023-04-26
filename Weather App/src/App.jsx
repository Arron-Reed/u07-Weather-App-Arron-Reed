import './App.css'
import { useState } from 'react';
import { useLocationStore } from './store/useLocationStore';

const App = () => {
  const [currentForecast, setCurrentForecast] = useState(undefined)
  const [dailyForecast, setDailyForecast] = useState(undefined)
  const [position] = useLocationStore((state) => [state.position]);

  const getWeather = async () => {
    console.log(position);
    const newJSON = JSON.stringify(position);
    const stepOne = newJSON.replace(/{"lat":/, '');
    const stepTwo = stepOne.replace(/"lng":/, '');
    const newPosition = stepTwo.slice(0, stepTwo.length - 1)
    console.log(newPosition)

/*  Set up my App with the OpenWeatherMAp API - then changed API after a few days

    const apiKey = import.meta.env.VITE_API_KEY_OpenWeatherMap;
    const currentURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      position.lat +
      "&lon=" +
      position.lng +
      "&units=metric&appid=" +
      apiKey;
      */

//    const apiKey = import.meta.env.VITE_API_KEY_OpenWeatherMap;

    const apiKey = import.meta.env.VITE_API_KEY_WeatherAPI;
    const currentURL =
      "http://api.weatherapi.com/v1/forecast.json?key=" +
      apiKey +
      "&q=" +
      newPosition +
      "&days=5" + "&aqi=no" + "&alerts=no" 
       
    const currentResponse = await fetch(currentURL);
    const currentResult = await currentResponse.json();
    setCurrentForecast(currentResult); 
    console.log(currentResult);   
    
  }

  return (
      <div className='search-container'>
        <div className='search-box'>    
          <h3>Weather App</h3>
          <button onClick={() => getWeather()}>Get Weather</button>
        </div>

        {currentForecast && (

          <article>
            <div className='current-weather'>
              <h3>{currentForecast.location.region}, {currentForecast.location.country}</h3>
              <p>It is currently {" "}{currentForecast.current.temp_c} °C </p>
              <p>Feels like {" "}{currentForecast.current.feelslike_c} °C </p>
              <p>{currentForecast.current.condition.icon}</p>
              <p>{currentForecast.current.condition.text}</p>
              <p>Wind direction {currentForecast.current.wind_dir}</p>
              <p>Wind speed {currentForecast.current.wind_kph} kph</p>
              <p>Humidity {currentForecast.current.humidity}%</p>
              <p>Sunrise {currentForecast.forecast.forecastday[0].astro.sunrise}</p>
              <p>Sunrise {currentForecast.forecast.forecastday[0].astro.sunset}</p>
            </div>

            <div className='forecast'>
              
              <div className='forecast1'>
                <p>Day 1</p>
                <p>{currentForecast.forecast.forecastday[0].day.condition.icon}</p>
                <p>{currentForecast.forecast.forecastday[0].date}</p>
                <p>{currentForecast.forecast.forecastday[0].day.mintemp_c} °C / {currentForecast.forecast.forecastday[0].day.maxtemp_c} °C</p>
                <p>Precipitation: {currentForecast.forecast.forecastday[0].day.totalprecip_mm}mm</p>

                
              </div>

              


              

              
            </div>
          </article>
        )}
      </div>


      
      

  )
}

export default App
