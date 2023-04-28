//  Set up my App with the OpenWeatherMAp API - then changed API after a few days

    const apiKey = import.meta.env.VITE_API_KEY_OpenWeatherMap;
    const currentURL =
      "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      position.lat +
      "&lon=" +
      position.lng +
      "&units=metric&appid=" +
      apiKey;



    const getCityWeather = async () => {
        console.log(searchQuery);
      
    
        const apiKey = import.meta.env.VITE_API_KEY_WeatherAPI;
        const selectedCity = city;
        const URL =
          "http://api.weatherapi.com/v1/forecast.json?key=" +
          apiKey +
          "&q=" +
          selectedCity +
          "&days=5" + "&aqi=no" + "&alerts=no" 
           
        const response = await fetch(URL);
        const result = await response.json();
        setCityForecast(result); 
        console.log(result); 
      }
    