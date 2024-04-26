import { useEffect, useState } from "react";
import { dayOfWeek } from "../../dayOfWeek";
import { getMonth } from "../../getMonth";
import { useRef } from "react";
import "./searchComponent.css";

export const Search = () => {
  const [forecast, setForecast] = useState();
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [celcius, setCelcius] = useState("true");

  const getWeather = async () => {
    try {
      if (city !== "") {
        const apiKey = import.meta.env.VITE_API_KEY;
        const URL =
          "https://api.weatherapi.com/v1/forecast.json?key=" +
          apiKey +
          "&q=" +
          city +
          "&days=3" +
          "&aqi=no" +
          "&alerts=no";

        const response = await fetch(URL);
        const result = await response.json();

        setForecast(result);
      }
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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setStatus("");
        setCity(position.coords.latitude + "," + position.coords.longitude);
      },

      () => {
        setStatus("Unable to retrieve your position");
      }
    );
  };

  useEffect(() => {
    if (city == "") getLocation();
    getWeather();
  }, [city]);

  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(inputRef.current.value);
  };

  const handleToggle = () => {
    setCelcius(!celcius);
  };
  

  return (
    <div className="search-container">
      <div className="search-box">
        <form onSubmit={(event) => handleSubmit(event)} className="search-form">
          <input
            type="text"
            placeholder="Select Location"
            ref={inputRef}
          ></input>
          <button className="search" type="submit">Search</button>
        </form>

        <div className="addOn">
          <div>
            <button className="currentLocation" onClick={getLocation}>
              Current Location
            </button>
          </div>

          <div>
            <button className="celciusFarenheit" onClick={handleToggle}>
              {celcius ? "°F" : "°C"}
              </button>
          </div>
        </div>
      </div>

      {forecast && (
        <article>
          <div className="current-weather">
            <h3>
              {forecast.location.name}, {forecast.location.country}
            </h3>

            <div className="header">
              <div>
                <img
                  src={forecast.current.condition.icon}
                  className="weather-image"
                ></img>
              </div>

              <div className="right-header">
                {celcius && (
                  <p className="temp">
                    {Math.round(forecast.current.temp_c)}°C
                  </p>
                )}
                {!celcius && (
                  <p className="temp">
                    {Math.round((forecast.current.temp_c * 9) / 5) + 32}°F
                  </p>
                )}

                {celcius && (
                  <p className="feelsLike">
                    Feels like {Math.round(forecast.current.feelslike_c)}°C
                  </p>
                )}
                {!celcius && (
                  <p className="feelsLike">
                    Feels like{" "}
                    {Math.round((forecast.current.feelslike_c * 9) / 5) + 32}°F
                  </p>
                )}
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
                <p>
                  {Math.round(forecast.current.wind_kph * 0.277778)} m/s -{" "}
                  {forecast.current.wind_dir}
                </p>
                <p>{forecast.current.humidity}%</p>
                <p>
                  {forecast.forecast.forecastday[0].astro.sunrise.toLowerCase()}
                </p>
                <p>
                  {forecast.forecast.forecastday[0].astro.sunset.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="forecast">
            {[0, 1, 2].map((i) => (
              <div className="forecast-box" key={i}>
                <p className="weekDay">
                  {" "}
                  {dayOfWeek(
                    new Date(
                      forecast.forecast.forecastday[i].date_epoch * 1000
                    ).getDay()
                  )}{" "}
                </p>
                <img
                  src={forecast.forecast.forecastday[i].day.condition.icon}
                  className="forecast-image"
                ></img>
                <div className="forecast-temp">
                  {celcius && (
                    <p className="ft-left">
                      {Math.round(
                        forecast.forecast.forecastday[i].day.mintemp_c
                      )}
                      °
                    </p>
                  )}
                  {!celcius && (
                    <p className="ft-left">
                      {Math.round(
                        (forecast.forecast.forecastday[i].day.mintemp_c * 9) / 5
                      ) + 32}
                      °
                    </p>
                  )}

                  {celcius && (
                    <p className="ft-right">
                      {Math.round(
                        forecast.forecast.forecastday[i].day.maxtemp_c
                      )}
                      °
                    </p>
                  )}
                  {!celcius && (
                    <p className="ft-right">
                      {Math.round(
                        (forecast.forecast.forecastday[i].day.maxtemp_c * 9) / 5
                      ) + 32}
                      °
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="hourly">
            <div className="h-header">
              <h4>Hourly Forecast</h4>
              <h5>
                {" "}
                {dayOfWeek(
                  new Date(
                    forecast.forecast.forecastday[0].date_epoch * 1000
                  ).getDay()
                )}
                , {forecast.forecast.forecastday[0].date.slice(8)}{" "}
                {getMonth(
                  parseInt(
                    forecast.forecast.forecastday[0].date
                      .slice(5, 7, 10)
                      .toString()
                  )
                )}{" "}
                {forecast.forecast.forecastday[0].date.slice(0, 4)}
              </h5>
            </div>
            <div>
              {[0, 3, 6, 9, 12, 15, 18, 21].map((h) => (
                <div className="hourly-inner" key={h}>
                  <p className="htime">{forecast.forecast.forecastday[0].hour[h].time.slice(11)}</p>
                  <img src={forecast.forecast.forecastday[0].hour[h].condition.icon} alt="weather" className="hi"></img>
                  {celcius && (<p className="htemp"> {Math.round(forecast.forecast.forecastday[0].hour[h].temp_c)}°</p>)}
                  {!celcius && (<p className="htemp">{Math.round((forecast.forecast.forecastday[0].hour[h].temp_c * 9)/5) + 32}°</p>)}

                  <p className="hwind">
                    {Math.round(
                      forecast.forecast.forecastday[0].hour[h].wind_kph *
                        0.277778
                    )}{" "}
                    m/s
                  </p>
                  <p className="hwdir">
                    {forecast.forecast.forecastday[0].hour[h].wind_dir}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      )}
    </div>
  );
};
