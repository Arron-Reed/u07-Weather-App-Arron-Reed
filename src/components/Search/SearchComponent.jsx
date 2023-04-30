import { useEffect, useState } from "react";
import "./searchComponent.css";
import { dayOfWeek } from "../../dayOfWeek";

export const Search = () => {
  
  const [forecast, setForecast] = useState();
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("Stockholm");

  const getWeather = async () => {
    try {
      const apiKey = import.meta.env.VITE_API_KEY_WeatherAPI;
      const URL =
        "https://api.weatherapi.com/v1/forecast.json?key=" +
        apiKey +
        "&q=" +
        city +
        "&days=5" +
        "&aqi=no" +
        "&alerts=no";

      const response = await fetch(URL);
      const result = await response.json();
      
      setForecast(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported on your browser!");
    } else {
      setStatus("Loading...");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setStatus(""); setCity(position.coords.latitude + "," + position.coords.longitude);
      },

      () => {
        setStatus("Unable to retrieve your position");
      }
      
    );
  };


  useEffect(() => {
    
    getLocation();
    getWeather();

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

        <form onSubmit={(event) => handleSubmit(event)} className="search-form">
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
              <p className="weekDay"> { dayOfWeek( new Date(forecast.forecast.forecastday[0].date_epoch * 1000).getDay() ) } </p>
              <img src={forecast.forecast.forecastday[0].day.condition.icon} className="forecast-image"></img>  
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[0].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[0].day.maxtemp_c)}°</p>
              </div>
            </div>

            <div className="forecast-box">
              <p className="weekDay"> { dayOfWeek( new Date(forecast.forecast.forecastday[1].date_epoch * 1000).getDay() ) } </p>
              <img src={forecast.forecast.forecastday[1].day.condition.icon} className="forecast-image"></img>  
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[1].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[1].day.maxtemp_c)}°</p>
              </div>
            </div>

            <div className="forecast-box">
              <p className="weekDay"> { dayOfWeek( new Date(forecast.forecast.forecastday[2].date_epoch * 1000).getDay() ) } </p>
              <img src={forecast.forecast.forecastday[2].day.condition.icon} className="forecast-image"></img>  
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[2].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[2].day.maxtemp_c)}°</p>
              </div>
            </div>

            <div className="forecast-box">
              <p className="weekDay"> { dayOfWeek( new Date(forecast.forecast.forecastday[3].date_epoch * 1000).getDay() ) } </p>
              <img src={forecast.forecast.forecastday[3].day.condition.icon} className="forecast-image"></img>  
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[3].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[3].day.maxtemp_c)}°</p>
              </div>
            </div>

            <div className="forecast-box">
              <p className="weekDay"> { dayOfWeek( new Date(forecast.forecast.forecastday[4].date_epoch * 1000).getDay() ) } </p>
              <img src={forecast.forecast.forecastday[4].day.condition.icon} className="forecast-image"></img>  
              <div className="forecast-temp">
                <p className="ft-left">{Math.round(forecast.forecast.forecastday[4].day.mintemp_c)}°</p> 
                <p  className="ft-right">{Math.round(forecast.forecast.forecastday[4].day.maxtemp_c)}°</p>
              </div>
            </div>

          </div>

          <div className="hourly">

            <div className="h-header">
              <h4>Hourly Forecast</h4>
              <h5> {dayOfWeek(new Date(forecast.forecast.forecastday[0].date_epoch * 1000).getDay())}, { forecast.forecast.forecastday[0].date.slice(8,) } May { forecast.forecast.forecastday[0].date.slice(0,4) }  
               </h5>

            </div>
            <div className="hourly-inner">

                <p className="htime">{ forecast.forecast.forecastday[0].hour[0].time.slice(11,) }</p>
                <img src={ forecast.forecast.forecastday[0].hour[0].condition.icon } alt="weather" className="hi"></img>
                <p className="htemp">{ Math.round(forecast.forecast.forecastday[0].hour[0].temp_c) }°</p>
                <p className="hwind">{ Math.round(forecast.forecast.forecastday[0].hour[0].wind_kph *0.277778 ) } m/s</p>
                <p className="hwdir">{ forecast.forecast.forecastday[0].hour[0].wind_dir }</p>  

                <p className="htime">{ forecast.forecast.forecastday[0].hour[3].time.slice(11,) }</p>
                <img src={ forecast.forecast.forecastday[0].hour[3].condition.icon } alt="weather" className="hi"></img>
                <p className="htemp">{ Math.round(forecast.forecast.forecastday[0].hour[3].temp_c) }°</p>
                <p className="hwind">{ Math.round(forecast.forecast.forecastday[0].hour[3].wind_kph *0.277778 ) } m/s</p>
                <p className="hwdir">{ forecast.forecast.forecastday[0].hour[3].wind_dir }</p>

                <p className="htime">{ forecast.forecast.forecastday[0].hour[6].time.slice(11,) }</p>
                <img src={ forecast.forecast.forecastday[0].hour[6].condition.icon } alt="weather" className="hi"></img>
                <p className="htemp">{ Math.round(forecast.forecast.forecastday[0].hour[6].temp_c) }°</p>
                <p className="hwind">{ Math.round(forecast.forecast.forecastday[0].hour[6].wind_kph *0.277778 ) } m/s</p>
                <p className="hwdir">{ forecast.forecast.forecastday[0].hour[6].wind_dir }</p>

                <p className="htime">{ forecast.forecast.forecastday[0].hour[9].time.slice(11,) }</p>
                <img src={ forecast.forecast.forecastday[0].hour[9].condition.icon } alt="weather" className="hi"></img>
                <p className="htemp">{ Math.round(forecast.forecast.forecastday[0].hour[9].temp_c) }°</p>
                <p className="hwind">{ Math.round(forecast.forecast.forecastday[0].hour[9].wind_kph *0.277778 ) } m/s</p>
                <p className="hwdir">{ forecast.forecast.forecastday[0].hour[9].wind_dir }</p>

                <p className="htime">{ forecast.forecast.forecastday[0].hour[12].time.slice(11,) }</p>
                <img src={ forecast.forecast.forecastday[0].hour[12].condition.icon } alt="weather" className="hi"></img>
                <p className="htemp">{ Math.round(forecast.forecast.forecastday[0].hour[12].temp_c) }°</p>
                <p className="hwind">{ Math.round(forecast.forecast.forecastday[0].hour[12].wind_kph *0.277778 ) } m/s</p>
                <p className="hwdir">{ forecast.forecast.forecastday[0].hour[12].wind_dir }</p>

                <p className="htime">{ forecast.forecast.forecastday[0].hour[15].time.slice(11,) }</p>
                <img src={ forecast.forecast.forecastday[0].hour[15].condition.icon } alt="weather" className="hi"></img>
                <p className="htemp">{ Math.round(forecast.forecast.forecastday[0].hour[15].temp_c) }°</p>
                <p className="hwind">{ Math.round(forecast.forecast.forecastday[0].hour[15].wind_kph *0.277778 ) } m/s</p>
                <p className="hwdir">{ forecast.forecast.forecastday[0].hour[15].wind_dir }</p>
 
                <p className="htime">{ forecast.forecast.forecastday[0].hour[18].time.slice(11,) }</p>
                <img src={ forecast.forecast.forecastday[0].hour[18].condition.icon } alt="weather" className="hi"></img>
                <p className="htemp">{ Math.round(forecast.forecast.forecastday[0].hour[18].temp_c) }°</p>
                <p className="hwind">{ Math.round(forecast.forecast.forecastday[0].hour[18].wind_kph *0.277778 ) } m/s</p>
                <p className="hwdir">{ forecast.forecast.forecastday[0].hour[18].wind_dir }</p>

                <p className="htime">{ forecast.forecast.forecastday[0].hour[21].time.slice(11,) }</p>
                <img src={ forecast.forecast.forecastday[0].hour[21].condition.icon } alt="weather" className="hi"></img>
                <p className="htemp">{ Math.round(forecast.forecast.forecastday[0].hour[21].temp_c) }°</p>
                <p className="hwind">{ Math.round(forecast.forecast.forecastday[0].hour[21].wind_kph *0.277778 ) } m/s</p>
                <p className="hwdir">{ forecast.forecast.forecastday[0].hour[21].wind_dir }</p>

            </div>
          </div>

        </article>
      )}
    </div>
  );
};
