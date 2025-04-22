/*
L Dettling
CIS 658

Sources:
https://www.weatherapi.com/docs/

*/



/*
Fields from API Docs:

temp_f	decimal	Temperature in fahrenheit
feelslike_f	decimal	Feels like temperature in fahrenheit
condition:text	string	Weather condition text
precip_in	decimal	Precipitation amount in inches



{
    "location": {
        "name": "Michigan City",
        "region": "Indiana",
        "country": "United States of America",
        "lat": 41.7075,
        "lon": -86.895,
        "tz_id": "America/Chicago",
        "localtime_epoch": 1745282868,
        "localtime": "2025-04-21 19:47"
    },
    "current": {
        "last_updated_epoch": 1745282700,
        "last_updated": "2025-04-21 19:45",
        "temp_c": 12.8,
        "temp_f": 55.0,
        "is_day": 0,
        "condition": {
            "text": "Overcast",
            "icon": "//cdn.weatherapi.com/weather/64x64/night/122.png",
            "code": 1009
        },
        "wind_mph": 15.0,
        "wind_kph": 24.1,
        "wind_degree": 281,
        "wind_dir": "WNW",
        "pressure_mb": 1016.0,
        "pressure_in": 29.99,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 62,
        "cloud": 100,
        "feelslike_c": 10.6,
        "feelslike_f": 51.1,
        "windchill_c": 13.4,
        "windchill_f": 56.1,
        "heatindex_c": 14.5,
        "heatindex_f": 58.1,
        "dewpoint_c": 7.5,
        "dewpoint_f": 45.5,
        "vis_km": 16.0,
        "vis_miles": 9.0,
        "uv": 0.1,
        "gust_mph": 21.9,
        "gust_kph": 35.2
    }
}

*/

import React, { useEffect, useState } from 'react';
import '../Weather.css'

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=Allendale,MI`
        );
        if (res.ok) {
          const data = await res.json();
          setWeatherData(data);
          console.log("weather data: ");
          console.log(data);
          console.log(data.location.name);
        } else {
          console.error("Weather fetch failed:", await res.json());
        }
      } catch (error) {
        console.error("Weather fetch error:", error);
      }
    };

    fetchWeather();
  }, [WEATHER_API_KEY]);

  if (!weatherData) return null;

  return (
    <div className="weather-holder">
      <div className="weather-location">
        {weatherData.location.name}, {weatherData.location.region}
      </div>
      <div className="weather-temp">
        <span>{weatherData.current.temp_f}°F</span>
      </div>
      <div className="weather-condition">{weatherData.current.condition.text}</div>
    </div>
  );
}

export default Weather;
