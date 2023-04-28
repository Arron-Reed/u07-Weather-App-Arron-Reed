import { useEffect, useState } from "react";
import "./searchComponent.css";

export const Search = () => {
  
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState("");


  const getSearchWeather = async () => {
    try {

  
      const apiKey = import.meta.env.VITE_API_KEY_WeatherAPI;
      const URL = "http://api.weatherapi.com/v1/forecast.json?key=" + apiKey + "&q=" + city + "&days=5" + "&aqi=no" + "&alerts=no" 
     
      const response = await fetch(URL);
      const result = await response.json();
     
      setForecast(result);
      
    } catch (error) {
      console.log(error)
    }  
  }

//  useEffect(() => {
//    getSearchWeather()
//  });

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getSearchWeather();
  }


  return (
    <div className='search-container'>
      <div className='search-box'>  

        <form onSubmit={(event) => handleSubmit(event)}>
          <input type="text" placeholder="Select Location" onChange={(event) => handleChange(event)}></input>
          <button type="submit">Search</button>
         </form> 
        </div>

        {forecast && (

          <article>
            <div className='current-weather'>
              <h3>{forecast.location.name}, {forecast.location.country}</h3>

              <div className="header">
                <div>
                  <img src={forecast.current.condition.icon} className='weather-image'></img>
                </div>

                <div className="right-header">
                  <p className="temp">{forecast.current.temp_c}°C</p>
                  <p className="feelsLike">Feels like {forecast.current.feelslike_c}°C</p>
                </div>
            
              </div>

              <div className="value-pairs1">
                <p>Wind</p> 
                <p className="right">{forecast.current.wind_kph} kph  {forecast.current.wind_dir}</p>
              </div>
              
              <div className="value-pairs">
                <p>Humidity</p>
                <p className="right">{forecast.current.humidity}%</p>
              </div>
              
              <div className="value-pairs">
                <p>Sunrise</p>
                <p className="right">{forecast.forecast.forecastday[0].astro.sunrise}</p>
              </div>
              
              <div className="value-pairs">
                <p>Sunset</p>
                <p className="right">{forecast.forecast.forecastday[0].astro.sunset}</p>
              </div>
            </div>

            <div className='forecast'>
              
              <div className='forecast1'>
                <p>Day 1</p>
                <p>{forecast.forecast.forecastday[0].day.condition.icon}</p>
                <p>{forecast.forecast.forecastday[0].date}</p>
                <p>{forecast.forecast.forecastday[0].day.mintemp_c} °C / {forecast.forecast.forecastday[0].day.maxtemp_c} °C</p>
                <p>Precipitation: {forecast.forecast.forecastday[0].day.totalprecip_mm}mm</p>
              </div>

              


              

              
            </div>
          </article>
        )}
      </div>


      
      

  )
    
  
}