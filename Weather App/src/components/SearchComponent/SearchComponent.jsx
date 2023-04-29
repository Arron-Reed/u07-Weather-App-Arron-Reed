import { useEffect, useState } from "react";
import "./searchComponent.css";


export const Search = () => {
  
  const [forecast, setForecast] = useState();
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [day, setDay] = useState("");


  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported on your browser!");
    } else {
      setStatus("Loading...");
    }

    navigator.geolocation.getCurrentPosition((pos) => {
      setStatus(""); setCity(pos.coords.latitude + "," + pos.coords.longitude);
      },

      () => {
        setStatus("Unable to retrieve your position");
      }
    );
    console.log(city);
  };


  const getWeather = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY_WeatherAPI;
      const URL =
        "http://api.weatherapi.com/v1/forecast.json?key=" +
        apiKey +
        "&q=" +
        city +
        "&days=5" +
        "&aqi=no" +
        "&alerts=no";

      const response = await fetch(URL);
      const result = await response.json();
console.log(result)
      setForecast(result);
    } catch (error) {
      console.log(error);
    }
  };


  function dayOfWeek(){
    
    
          switch (x) { 
            case 0:
              setDay("Sunday");
              break;
            case 1:
              setDay("Monday");
              break;
            case 2:
              setDay("Tuesday");
              break;
            case 3:
              setDay("Wednesday");
              break;
            case 4:
              setDay("Thursday");
              break;
            case 5:
              setDay("Friday");
              break; 
            case 6:
              setDay("Saturday");
          }
        }


  useEffect(() => {
    getLocation();
    
    
  }, []);
 
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getWeather();
  };

  return (
    <div className="search-container">
      <div className="search-box">

        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            placeholder="Select Location"
            onChange={(event) => handleChange(event)}
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>

      {forecast && (
        <article>
          <div className="current-weather">
            <h3>
              {forecast.location.name}, {forecast.location.country}
            </h3>

            <div className="header">
              
              <div>
                <img src={forecast.current.condition.icon} className="weather-image"></img>
              </div>

              <div className="right-header">
                <p className="temp">{forecast.current.temp_c}°C</p>
                <p className="feelsLike">
                  Feels like {Math.round(forecast.current.feelslike_c)}°C
                </p>
              </div>
            </div>

            <div className="info">

              <div className="left">
                <p>Wind</p>
                <p>Humidity</p>
                <p>Sunrise</p>
                <p>Sunset</p>
              </div>

              <div className="right">
                <p>{Math.round(forecast.current.wind_kph *0.277778)} m/s - {forecast.current.wind_dir}</p>
                <p>{forecast.current.humidity}%</p>
                <p>{forecast.forecast.forecastday[0].astro.sunrise.toLowerCase()}</p>
                <p>{forecast.forecast.forecastday[0].astro.sunset.toLowerCase()}</p>
              </div>

            </div>
          </div>

          <div className="forecast">
            
            <div className="forecast-box">
              <img src={forecast.forecast.forecastday[0].day.condition.icon} className="forecast-image"></img>  
              
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[0].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[0].day.maxtemp_c)}°</p>
              </div>
            </div>

            <div className="forecast-box">
              <img src={forecast.forecast.forecastday[1].day.condition.icon} className="forecast-image"></img>  
              
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[1].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[1].day.maxtemp_c)}°</p>
              </div>
            </div>

            <div className="forecast-box">
              <img src={forecast.forecast.forecastday[2].day.condition.icon} className="forecast-image"></img>  
              
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[2].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[2].day.maxtemp_c)}°</p>
              </div>
            </div>

            <div className="forecast-box">
              <img src={forecast.forecast.forecastday[3].day.condition.icon} className="forecast-image"></img>  
              
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[3].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[3].day.maxtemp_c)}°</p>
              </div>
            </div>

            <div className="forecast-box">
              <img src={forecast.forecast.forecastday[4].day.condition.icon} className="forecast-image"></img>  
              
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[4].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[4].day.maxtemp_c)}°</p>
              </div>
            </div>

          </div>

        </article>
      )}
    </div>
  );
};
