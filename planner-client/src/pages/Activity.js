
import "./Activity.css"
import { Container } from "react-bootstrap";
import { WiDaySunny, WiCloud, WiFog, WiSnow, WiRain } from 'weather-icons-react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from "react";
import { fetchData, fetchFutureData, getWeatherWidget } from "../utils/weather";
import Modal from 'react-bootstrap/Modal';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import { reset, getActivities, deleteActivity, updateActivity, getActivitiesByInvites } from "../features/activity/activitySlice";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addInvites, getInvites, reset as resetInvite } from "../features/invite/inviteSlice";



const Activity = () => {




  let today_date_obj = new Date();
  let today = today_date_obj.toISOString().slice(0, 10)
  let next5Days_obj = new Date();
  next5Days_obj.setDate(today_date_obj.getDate() + 5);
  let next5Days = next5Days_obj.toISOString().slice(0, 10)
  const key = process.env.REACT_APP_API_KEY

  const { user } = useSelector((state) => state.auth)
  const { fetched_activities, invited_activities ,message, isError, isLoading } = useSelector((state) => state.act)
  const { fetched_invites } = useSelector((state) => state.invite)
  const [allActivities, setAllActivities] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  // fetching user's activities and invites activity
  useEffect(() => {
    dispatch(getActivities())
    dispatch(getInvites())
    if (!user) {
      navigate('/login')
    }
    return () => {
      // reset activities state only when unmouted
      dispatch(reset())
    }
  }, [dispatch, isError, navigate, user])

  useEffect(() => {
    if (fetched_activities.length > 0 && message) {
      showSuccessToast(message)
    }
  }, [fetched_activities, message])

  useEffect(() => {
    console.log("check fetched invites", fetched_invites, " check: " , fetched_invites.inviteds)
    if (fetched_invites.inviteds && fetched_invites.inviteds.length > 0){
      console.log("start dispatch getActivitiesByInvites")
      dispatch(getActivitiesByInvites(fetched_invites.inviteds))
    }
  }, [fetched_invites])

  useEffect(()=>{
    if (invited_activities.length && invited_activities.length > 0){
      console.log("check invited activities", invited_activities)
      // combine all activities and sort by date
      const activities = [...fetched_activities, ...invited_activities];
      activities.sort((a, b) => new Date(a.date) - new Date(b.date));
      setAllActivities(activities);
    }
  }, [invited_activities, fetched_activities])

  useEffect(() => {
    if (allActivities.length>0){
      console.log("check all activities: ", allActivities)
    }
  }, [allActivities])

  // input form
  const [activityID, setActivityID] = useState("")
  const [cityInput, setCityInput] = useState("")
  const [dateInput, setDateInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [noteInput, setNoteInput] = useState("")
  const [fromInput, setFromInput] = useState("")
  const [toInput, setToInput] = useState("")
  const [weather, setWeather] = useState("")



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


  // edit and update activity
  const updateFutureData = async (cityArg) => {
    await fetchFutureData(cityArg, key).then((res) => {
      if (res) {
        let updated_weather = weather
        res.list.forEach((object) => {
          if (object.dt_txt.includes(dateInput) && object.dt_txt.includes("12:00:00")) {
            updated_weather = object.weather[0].main;
          }
        });
        const updatedFormData = {
          ...formData,
          weather: updated_weather
        }
        dispatch(updateActivity({ activity_id: activityID, formData: updatedFormData }))
      }
    }).catch((error) => {
      console.log(error)
      showErrorToast(error + "City Not Found: " + cityArg)
      console.log("formData error: ", formData)
    })
  }


  const updateData = async (cityArg) => {
    await fetchData(cityArg, key).then((res) => {
      if (res) {
        let updated_weather = res.weather[0].main
        const updatedFormData = {
          ...formData,
          weather: updated_weather
        }
        dispatch(updateActivity({ activity_id: activityID, formData: updatedFormData }))
      }
    }).catch((error) => {
      console.log(error)
      showErrorToast(error + " City Not Found: " + cityArg)
      console.log("formData error:", formData)
    });
  }





  const editActivity = async () => {
    const selectedDate = new Date(dateInput).getTime();
    const todayDate = new Date(today).getTime();

    if (selectedDate > todayDate) {

      updateFutureData(cityInput)
    }
    else {
      updateData(cityInput)
    }

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

    editActivity()
    handleClose();
  }


  const nextPage = () => setActivePage(activePage + 1);
  const previousPage = () => setActivePage(activePage - 1);

  const handleShow = (event, activity) => {
    if (user) {
      setActivityID(activity._id)
      setCityInput(activity.city);
      setDateInput(activity.date);
      setNameInput(activity.name);
      setNoteInput(activity.note);
      setFromInput(activity.from);
      setToInput(activity.to);
      setWeather(activity.weather)
      if (event.target.name == "addfriend") {
        nextPage()
      }
      setShow(true)
    }
  };
  

  const getInvitedsByID = (act) => {
    let invites = []
    if (act.host !== user._id){
      invites = fetched_invites.inviteds.filter((invite) => invite.activity === act._id);
    }
    return invites;
  }
  const getInvitesByID = (act) => {
    let invites = []
    if (act.host === user._id) {
      invites = fetched_invites.invites.filter((invite) => invite.activity === act._id);
    }
    return invites;
  }

  return (
    <div className='login'>
      <Container className="w-75" >
        <div className="list-group">


          {
            allActivities.length > 0 ? (
              allActivities.map((act) => (
                <div key={act._id}>
                  <div className="list-group-item list-group-item-action flex-column align-items-start" >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{act.name} {act.host === user._id ? "" : "- Host: " + getInvitedsByID(act)[0].hostname}</h5>
                      <button type="button" className="btn-close" aria-label="Close" onClick={() => dispatch(deleteActivity(act._id))}>

                      </button>
                    </div>

                    <small>{act.date} | {act.from} to {act.to} | {getWeatherWidget(act.weather, 24, "#000")} {act.weather}</small> <br />


                    <small>Location: {act.city}</small>


                    <p className="mb-1">{act.note}</p>

                    <div className="d-flex w-100 justify-content-between">
                      <div>
                        <button type="button" name="edit" className="btn btn-warning btn-sm mt-2" onClick={(e) => handleShow(e, act)}>Edit information</button>
                        <button type="button" name="addfriend" className="btn btn-primary btn-sm mt-2" onClick={(e) => handleShow(e, act)} style={{ marginLeft: "0.5rem" }}>Add Friend</button>
                      </div>
                      <div>

                        {getInvitedsByID(act).map((invite) => (
                          <button type="button" className="btn btn-danger btn-sm mt-2" style={{ marginLeft: "0.5rem" }}>{invite.hostname} (host) </button>
                        ))}

                        {getInvitesByID(act).map((invite) => (
                          <button type="button" className="btn btn-success btn-sm mt-2" style={{ marginLeft: "0.5rem" }}>{invite.guestname} </button>
                        ))}
                      

                      </div>
                    </div>
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
                          <p>Premium feature - comming soon </p>
                        </Form>
                      )}
                    </Modal.Body>
                  </Modal>

                </div>
              ))

            ) : (
              <h3>Waiting for activities to be displayed...</h3>
            )
          }




        </div>

      </Container>

    </div>
  )

};

export default Activity;