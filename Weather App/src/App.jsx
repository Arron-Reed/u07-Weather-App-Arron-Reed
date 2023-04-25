import './App.css'
import { useState } from 'react';
import { useEffect } from 'react';

const GetLocation = () => {
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState(undefined);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported on your browser!");
    } else {
      setStatus("Loading...");
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setStatus("");
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude});
      },
      () => {
        setStatus("Unable to retrieve your position");
      }
    );
  };


  return (
    <div>
      <button onClick={() => getLocation()}>Get Location</button>
      {status && <p>Status: {status}</p>}
      {position && <p>Your latitude: {position.lat}</p>}
      {position && <p>Your longitude: {position.lng}</p>}
    </div>
  )
}



const App = () => {
  const [forecast, setForecast] = useState(undefined)
  const [position, setPosition] = useState(undefined)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log("Everything AOK");
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude});
      },
      () => {
        console.log("Unable to retrieve your position");
      }
    )
  }, [])


  const getWeather = async () => {
    console.log(position);
    const URL =
      "https://api.openweathermap.org/data/2.5/weather?lat=" + position.lat + "&lon=" + position.lng + "&units=metric&appid=8f4e32ccc809887b7c76956d8a05f875";
    const response = await fetch(URL);
    const result = await response.json();
    console.log(result);
    setForecast(result);      
  }

  return (
    <div className='App'>
      <h3>Weather Now</h3>
      <p>Check out our weather app</p>
      <button onClick={() => getWeather()}>Get Weather</button>
      {forecast && (
      <article>
        <h3>{forecast.name}</h3>
        <p>In {forecast.name} it is currently {" "}{forecast.main.temp} °C </p>
      </article>
      )}
    </div>
  )
}

export default App
