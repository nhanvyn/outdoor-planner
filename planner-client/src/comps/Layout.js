import "./Layout.css"
import { Children } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";

const Layout = () => {

  let today_date_obj = new Date();
  let today = today_date_obj.toISOString().slice(0, 10)
  let next5Days_obj = new Date();
  next5Days_obj.setDate(today_date_obj.getDate() + 5);
  let next5Days = next5Days_obj.toISOString().slice(0, 10)

  let time = today_date_obj.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })


  const [data, setData] = useState(null);

  const [city, setCity] = useState("Vancouver");
  const [date, setDate] = useState(today);

  const [cityInput, setCityInput] = useState("");
  const [dateInput, setDateInput] = useState(today);

  const [topic, setTopic] = useState("city-lanscape")



  useEffect(() => {
    const key = process.env.REACT_APP_API_KEY

    const fetchData = async () => {

      await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        }).then(res => {
          setData(res);
          setTopic(res.weather[0].main)
          // console.log(res);
        }).catch(console.error)

    }

    const fetchFutureData = async () => {
      await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        }).then(res => {
          // access element: res.toJSON().list
          // for each list element, if elem.dt_txt contain 12:00:00 and selected date
          // setData to list element

          res.list.map((object, index) => {

            if (object.dt_txt.includes(date) && object.dt_txt.includes("12:00:00")) {
              console.log("check future date =", object);
              setData(object);
              setTopic(object.weather[0].main)
            }
          })

        }).catch(console.error)
    }

    // check if the date selected is current date
    // if it is then call this fetchData()
    // else call fetchFutureData
    console.log("today =", today, "AND date =", date);

    const selectedDate = new Date(date).getTime();
    const todayDate = new Date(today).getTime();
    if (selectedDate > todayDate) {
      fetchFutureData();
    }
    else {
      fetchData();
    }





  }, [city, date])





  const handleSubmit = (event) => {
    event.preventDefault(); // help to prevent the page from refreshing after hutting submit
    setCity(cityInput);
    setDate(dateInput);

  }


  return (
    <div className="container">
      <div className="row">



        <div className="col">
          <div className="card bg-dark text-white">
            <img className="card-img" src={`https://source.unsplash.com/random/600x600/?${topic}`} alt="Card image" />
            <div className="card-img-overlay">
              <div className="bg-dark bg-opacity-50 text-center py-3">
                <h5 className="card-title">{city}</h5>
                <p className="card-text lead">{date}</p>
                <p className="card-text">Updated at {time} </p>
                {/* <i className="fas fa-cloud fa-4x" /> */}
                <h1 className="fw-bolder ">{(data !== null && 'main' in data) ? (data.main.temp - 273.15).toFixed(2) : 30.4} &deg;C</h1>
                <p className="fw-bolder mb-0 lead">{(data !== null && 'weather' in data) ? data.weather[0].main : 'No Data'}</p>
              </div>
            </div>
          </div>
        </div>



        <div className="col">
          <Form onSubmit={handleSubmit} className='mt-4'>
            <h1 className='text-center'>Add new activity</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="Activity" placeholder="Activity name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Control
                type="City"
                placeholder="Where to?"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">

              <Form.Control
                type="Date"
                min={today}
                max={next5Days}
                value={dateInput}
                onChange={(e) => setDateInput(e.target.value)}

              />

            </Form.Group>
            <div className="mt-3 d-flex justify-content-center gap-2 mb-5">
              <Button type="submit" className='checkWeather'>
                Check Weather
              </Button>

              <Button className='addToPlan'>
                Save
              </Button>

            </div>
          </Form>
        </div>




      </div>
    </div>
  )
};

export default Layout;