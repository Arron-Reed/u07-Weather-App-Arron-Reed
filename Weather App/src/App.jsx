import './App.css'

function App() {
  const URL =
  "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&units=metric&appid=8f4e32ccc809887b7c76956d8a05f875";

const getWeather = async () => {
  const response = await fetch(URL);
  const result = await response.json();
  console.log(result);
}

  return (
    <div className='App'>
      <h3>Weather Now</h3>
      <p>Check out our weather app</p>
      <button onClick={() => getWeather()}>Get Weather</button>
    </div>
  )
}

export default App
