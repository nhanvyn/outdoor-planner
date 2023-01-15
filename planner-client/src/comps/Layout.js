import "./Layout.css"
import { Children } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

const Layout = () => {

  const [city, setCity] = useState("Vancouver");
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");


  useEffect(() => {
    const key = 'dad0630945bf043388ae96ea52c7842a'
    // const response = await fetch(`/https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`);
    // console.log("Response = ", response)
    const fetchData = async () => {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)


      setData(await response.json())

    }

    fetchData().catch(console.error)


  }, [])


  // const getDegree = (temp) =>{
  //   const degree 
  // }
  console.log(data)
  return (
    <div className="container">
      <div className="row">



        <div className="col">
          <div className="card bg-dark text-white">
            <img className="card-img" src="https://source.unsplash.com/random/600x600/?city-landscape" alt="Card image" />
            <div className="card-img-overlay">
              <div className="bg-dark bg-opacity-50 text-center py-3">
                <h5 className="card-title">Vancouver</h5>
                <p className="card-text lead">Sunday, 19th, 2023</p>
                <p className="card-text">Updated at </p>
                {/* <i className="fas fa-cloud fa-4x" /> */}
                <h1 className="fw-bolder ">{data !== null ? (data.main.temp - 273.15).toFixed(2) : 30.4} &deg;C</h1>
                <p className="fw-bolder mb-0 lead">Cloud</p>
              </div>
            </div>
          </div>
        </div>



        <div className="col">
          <Form className='mt-4'>
            <h1 className='text-center'>Add new activity</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="city" placeholder="Activity name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="city" placeholder="Where to?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">

              <Form.Control type="Date" min="2023-01-14" max="2023-01-20" />

            </Form.Group>
            <div className="mt-3 d-flex justify-content-center gap-2 mb-5">
              <Button className='checkWeather'>
                Check Weather
              </Button>

              <Button className='addToPlan'>
                Add to plan
              </Button>

            </div>
          </Form>
        </div>




      </div>
    </div>
  )
};

export default Layout;