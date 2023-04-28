import './App.css'
import { useEffect, useState } from 'react';
import { useLocationStore } from './store/useLocationStore';
import { Search } from './components/SearchComponent/SearchComponent';
import { GetLocation } from './components/GetLocation/GetLocationComponent';

const App = () => {
  const [currentForecast, setCurrentForecast] = useState(undefined);
  const [position] = useLocationStore((state) => [state.position]);


// After reading more I realise I should use join() next time

  const getWeather = async () => {
    const newJSON = JSON.stringify(position);
    const stepOne = newJSON.replace(/{"lat":/, '');
    const stepTwo = stepOne.replace(/"lng":/, '');
    const newPosition = stepTwo.slice(0, stepTwo.length - 1)
    console.log(newPosition)

    const apiKey = import.meta.env.VITE_API_KEY_WeatherAPI;
    const URL =
      "http://api.weatherapi.com/v1/forecast.json?key=" +
      apiKey +
      "&q=" +
      newPosition +
      "&days=5" + "&aqi=no" + "&alerts=no" 
       
    const response = await fetch(URL);
    const result = await response.json();
    setCurrentForecast(result); 
    console.log(result);   
    

  }

  return (
    
      <div className='search-container'>
        <h1>Weather App</h1>
        <Search />
        <div className='search-box'>  

          
{/*        
          <div>
            <form>
              <input id="location" type="text" value={searchQuery} placeholder="Search Location" onChange={event => {
                setSearchQuery(event.target.value);
              }}/>
            </form>
          </div>
*/} 
   
         <button onClick={() => getWeather()}>Current Location</button>
  
        </div>

        {currentForecast && (

          <article>
            <div className='current-weather'>
              <h3>{currentForecast.location.name}, {currentForecast.location.country}</h3>

              <div className="header">
                <div>
                  <img src={currentForecast.current.condition.icon} className='weather-image'></img>
                </div>

                <div className="right-header">
                  <p className="temp">{currentForecast.current.temp_c}°C</p>
                  <p className="feelsLike">Feels like {currentForecast.current.feelslike_c}°C</p>
                </div>
            
              </div>

              <div className="value-pairs1">
                <p>Wind</p> 
                <p className="right">{currentForecast.current.wind_kph} kph  {currentForecast.current.wind_dir}</p>
              </div>
              
              <div className="value-pairs">
                <p>Humidity</p>
                <p className="right">{currentForecast.current.humidity}%</p>
              </div>
              
              <div className="value-pairs">
                <p>Sunrise</p>
                <p className="right">{currentForecast.forecast.forecastday[0].astro.sunrise}</p>
              </div>
              
              <div className="value-pairs">
                <p>Sunset</p>
                <p className="right">{currentForecast.forecast.forecastday[0].astro.sunset}</p>
              </div>
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