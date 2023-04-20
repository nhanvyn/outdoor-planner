
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