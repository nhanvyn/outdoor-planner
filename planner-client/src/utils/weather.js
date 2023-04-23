import { WiDaySunny, WiCloud, WiFog, WiSnow, WiRain, WiCloudy } from 'weather-icons-react';

export const fetchData = (city, key) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
      if (!response.ok) {
        throw new Error(response.status)
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};


export const fetchFutureData = (city, key) => {

  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&`);
      if (!response.ok) {
        throw new Error(response.status)
      }
      const data = await response.json()

      resolve(data);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  })
};





export const getWeatherWidget = (weather, size, color) => {
  if (!weather){
    return <small>empty</small>
  }
  if (weather === "unknown"){
    return <small>unknown</small>
  }
  if (weather.includes('Cloud')) {
    return <WiCloud size={size} color={color} style={{ marginBottom: "0.3rem" }} />;
  } else if (weather.includes('Clear') || weather.includes('Sun')) {
    return <WiDaySunny size={size} color={color} style={{ marginBottom: "0.3rem" }} />;
  } else if (weather.includes('Rain')) {
    return <WiRain size={size} color={color} style={{ marginBottom: "0.3rem" }} />;
  } else if (weather.includes('Mist') || weather.includes('fog')) {
    return <WiFog size={size} color={color} style={{ marginBottom: "0.3rem" }} />;
  } else if (weather.includes('Snow')) {
    return <WiSnow size={size} color={color} style={{ marginBottom: "0.3rem" }} />;
  } else {
    return <WiCloudy size={size} color={color} style={{ marginBottom: "0.3rem" }} />;
  }
};