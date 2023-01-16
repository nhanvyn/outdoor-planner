import { useEffect } from "react";
import "./Weather.css"



const Weather = () => {



  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY
    const city = 'New York'
    // const response = await fetch(`/https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    // console.log("Response = ", response)
    const fetchData = async () => {
      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`).then(res => res.json()).then(data => { console.log(data) })
    }

    fetchData().catch(console.error)


  }, [])

  return (
    <div className="card bg-dark text-white">
      <img className="card-img" src="https://source.unsplash.com/random/600x600/?city-landscape" alt="Card image" />


      <div className="card-img-overlay">
        <div className="bg-dark bg-opacity-50 text-center py-3">
          <h5 className="card-title">Vancouver</h5>
          <p className="card-text lead">Sunday, 19th, 2023</p>
          <p className="card-text">Updated at </p>
          {/* <i className="fas fa-cloud fa-4x" /> */}
          <h1 className="fw-bolder ">30.4 &deg;C</h1>
          <p className="fw-bolder mb-0 lead">Cloud</p>
        </div>




      </div>
    </div>
  )
};

export default Weather;