import "./Layout.css"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { fetchData, fetchFutureData, getWeatherWidget } from "../utils/weather";
import Modal from 'react-bootstrap/Modal';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import { addActivity, reset } from "../features/activity/activitySlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const Layout = () => {

  let today_date_obj = new Date();
  let today = today_date_obj.toISOString().slice(0, 10)
  let next5Days_obj = new Date();
  next5Days_obj.setDate(today_date_obj.getDate() + 5);
  let next5Days = next5Days_obj.toISOString().slice(0, 10)
  const key = process.env.REACT_APP_API_KEY
  let today_time = today_date_obj.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })




  const [data, setData] = useState(null);
  const [topic, setTopic] = useState("city-landscape")



  const [city, setCity] = useState("Vancouver")
  const [date, setDate] = useState(today)
  const [name, setName] = useState("")
  const [note, setNote] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [weather, setWeather] = useState("")

  const [cityInput, setCityInput] = useState("")
  const [dateInput, setDateInput] = useState(today)
  const [nameInput, setNameInput] = useState("")
  const [noteInput, setNoteInput] = useState("")
  const [fromInput, setFromInput] = useState("12:00")
  const [toInput, setToInput] = useState("12:00")




  const { user } = useSelector((state) => state.auth)
  const { created_activities, message, isError, isLoading, isSuccess } = useSelector((state) => state.act)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formData = {
    user: user,
    name: nameInput,
    note: noteInput,
    date: dateInput,
    from: fromInput,
    to: toInput,
    city: cityInput,
    weather: weather
  }
  

  // note: update and createAct both call getFuture data -> need to seperate

  
  const getTodayData = async (cityArg, cmd) => {
    console.log("get today data is called")
    await fetchData(cityArg, key).then((res) => {
      if (res) {
        setData(res);
        setTopic(res.weather[0].main)
        setWeather(res.weather[0].main)
        let updated_weather = res.weather[0].main
        if (cmd == "create"){
          const updatedFormData = {
            ...formData,
            weather: updated_weather
          }
          console.log("dispatch formData: ", updatedFormData)
          dispatch(addActivity(updatedFormData))
        }
      }
    }).catch((error) => {
      console.log(error)
      showErrorToast(error + " City Not Found: " + cityArg)
      console.log("formData error:", formData)
    });
  }


  const getFutureData = async (cityArg, dateArg, cmd) => {
    await fetchFutureData(cityArg, key).then((res) => {
      console.log("get future called")
      if (res) {
        let updated_weather = "unknown"
        let weather_obj; 
        res.list.forEach((object) => {
          if (object.dt_txt.includes(dateArg) && object.dt_txt.includes("12:00:00")) {
            updated_weather = object.weather[0].main;
            weather_obj = object
          }
       
        });
        setData(weather_obj);
        setTopic(weather_obj.weather[0].main)
        setWeather(weather_obj.weather[0].main)
        if (cmd == "create"){
          const updatedFormData = {
            ...formData,
            weather: updated_weather
          }
          console.log("dispatch formData: ", updatedFormData)
          dispatch(addActivity(updatedFormData))
        }
      }
    }).catch((error) => {
      console.log(error)
      showErrorToast(error + "City Not Found: " + cityArg)
      console.log("formData error: ", formData)
    })
  }



  const updateWeather = () => {
    console.log("update weather called")
    const selectedDate = new Date(date).getTime();
    const todayDate = new Date(today).getTime();
    if (selectedDate > todayDate) {

      getFutureData(city, date, "update");
    }
    else {

      getTodayData(city, "update")
    }
  }


  useEffect(() => {
    if (!isLoading) {
      // when createActivity is in process, no need to call updateWeather()
      updateWeather()
    }
  }, [city, date])

  const handleCheckWeather = (event) => {
    event.preventDefault(); // help to prevent the page from refreshing after hutting submit
    setCity(cityInput);
    setDate(dateInput);
    setName(nameInput)

  }


  useEffect(() => {
    //console.log("created_activities: ", created_activities)
    if (isError) {
      showErrorToast(message)
    }
    else if (created_activities.length > 0 && message) {
      showSuccessToast("createActivity: " + message)
    }
    dispatch(reset())
  }, [created_activities, message])

  const createActivity = async () => {
    const selectedDate = new Date(dateInput).getTime();
    const todayDate = new Date(today).getTime();
    console.log("createActivity is called")
    if (selectedDate > todayDate) {

      await getFutureData(cityInput, dateInput, "create")
    }
    else {
      await getTodayData(cityInput, "create")
    }
    setCity(cityInput);
    setDate(dateInput);
    setName(nameInput);
    setNote(noteInput);
    setFrom(fromInput);
    setTo(toInput);

  }


  // Modal
  const [show, setShow] = useState(false);
  const [activePage, setActivePage] = useState(1);

  const handleClose = () => {
    setShow(false);
    setActivePage(1); // Reset the active page when closing the modal
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    createActivity()
    handleClose();
  }

  const handleShow = () => {
    if (user){
      setShow(true)
    } else {
      navigate('/login')
    }
  };
  const nextPage = () => setActivePage(activePage + 1);
  const previousPage = () => setActivePage(activePage - 1);



  return (
    <div className="container">
      <div className="row">



        <div className="col">
          <div className="card bg-dark">
            <img className="card-img" src={`https://source.unsplash.com/random/600x600/?${topic}`} alt="Card image" />
            <div className="card-img-overlay">
              <div className="bg-dark bg-opacity-50 text-center py-3">
                <h5 className="card-title responsive-text">{city}</h5>
                <p className="card-text lead responsive-text">{date}</p>
                <p className="card-text responsive-text">Updated at {today_time} </p>
                {/* <i className="fas fa-cloud fa-4x" /> */}
                <h1 className="fw-bolder responsive-text">{(data !== null && 'main' in data) ? (data.main.temp - 273.15).toFixed(2) : 30.4} &deg;C</h1>
                <div className="fw-bolder mb-0 lead responsive-text">
                  {data !== null && 'weather' in data ? (
                    <div>
                      {getWeatherWidget(data.weather[0].main, 25, "#fff")}
                      {data.weather[0].main}
                    </div>
                  ) : (
                    'No Data'
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="col">
          <Form onSubmit={handleCheckWeather} className='mt-4'>
            <h1 className='text-center'>Plan your activity</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Activity name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Control
                type="City"
                placeholder="Which city?"
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

              <Button className='addToPlan' onClick={handleShow}>
                Save
              </Button>

            </div>
          </Form>
        </div>








        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            {activePage == 1 ? (
              <>
                <Modal.Title>Additional information</Modal.Title>
                <Button variant="primary" onClick={nextPage}>
                  Invite People
                </Button>
              </>
            ) : (
              <>
                <div className="d-flex">
                  <Button variant="primary" onClick={previousPage}>
                    {"<<"}
                  </Button>
                  <Modal.Title className="ms-3">Invite people</Modal.Title>
                </div>
              </>
            )}

          </Modal.Header>
          <Modal.Body>
            {activePage === 1 ? (

              <Form onSubmit={handleSubmit}>


                <Form.Group className="mb-3">
                  <Form.Label className="ms-1" style={{ fontSize: '10px', color: '#999999' }}>NAME</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Activity name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="ms-1" style={{ fontSize: '10px', color: '#999999' }}>CITY</Form.Label>
                  <Form.Control
                    type="City"
                    placeholder="Which city?"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="ms-1" style={{ fontSize: '10px', color: '#999999' }}>DATE</Form.Label>
                  <Form.Control
                    type="Date"
                    min={today}
                    max={next5Days}
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}

                  />

                </Form.Group>

                <div className="d-flex">
                  <Form.Group className="mb-3 flex-grow-1">
                    <Form.Label className="ms-1" style={{ fontSize: '10px', color: '#999999' }}>FROM</Form.Label>
                    <Form.Control
                      type="Time"
                      value={fromInput}
                      onChange={(e) => setFromInput(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 ms-2 flex-grow-1">
                    <Form.Label className="ms-1" style={{ fontSize: '10px', color: '#999999' }}>TO</Form.Label>
                    <Form.Control
                      type="Time"
                      value={toInput}
                      onChange={(e) => setToInput(e.target.value)}
                    />
                  </Form.Group>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label className="ms-1" style={{ fontSize: '10px', color: '#999999' }}>NOTE</Form.Label>
                  <Form.Control
                    type="Text"
                    placeholder="Note (optional)"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                  />
                </Form.Group>



                <Form.Group className="mb-3 d-flex justify-content-end">

                  <Button className="me-2" variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Form.Group>
              </Form>



            ) : (
              <Form>
                <p>Premium features</p>
              </Form>
            )}
          </Modal.Body>
        </Modal>



      </div>
    </div>
  )
};

export default Layout;