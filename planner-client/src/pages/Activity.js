
import "./Activity.css"
import { Container } from "react-bootstrap";

import { Button, Form, InputGroup } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { fetchData, fetchFutureData, getWeatherWidget } from "../utils/weather";
import Modal from 'react-bootstrap/Modal';
import { showSuccessToast, showErrorToast } from '../utils/toast';
import { reset, getActivities, deleteActivity, updateActivity, getActivitiesByInvites, removeInvitedActivitiesByID } from "../features/activity/activitySlice";
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { addInvites, deleteInvitesByActivityID, getInvites, reset as resetInvite, deleteInvited } from "../features/invite/inviteSlice";
import { getGuests } from "../features/auth/authSlice";
import { HiUserCircle } from 'react-icons/hi'


const Activity = () => {
  let today_date_obj = new Date();
  let today = today_date_obj.toISOString().slice(0, 10)
  let next5Days_obj = new Date();
  next5Days_obj.setDate(today_date_obj.getDate() + 5);
  let next5Days = next5Days_obj.toISOString().slice(0, 10)
  const key = process.env.REACT_APP_API_KEY

  const { user, guests } = useSelector((state) => state.auth)
  const { fetched_activities, invited_activities, message, isError } = useSelector((state) => state.act)
  const { fetched_invites, user_invites, user_inviteds } = useSelector((state) => state.invite)

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
      dispatch(resetInvite())
    }
  }, [dispatch, isError, navigate, user])

  useEffect(() => {
    if (fetched_activities.length > 0 && message) {
      showSuccessToast(message)
    }
  }, [fetched_activities, message])

  useEffect(() => {
    console.log("check fetched invites", user_invites, " check inviteds: ", user_inviteds)
    if (user_inviteds.length > 0)
      dispatch(getActivitiesByInvites(user_inviteds))

  }, [user_invites, user_inviteds])

  useEffect(() => {
    //console.log("rerender: check invited activities", invited_activities)
    if (invited_activities.length > 0) {

      // combine all activities and sort by date
      const activities = [...fetched_activities, ...invited_activities];
      activities.sort((a, b) => new Date(a.date) - new Date(b.date));
      setAllActivities(activities);
    } else if (fetched_activities.length > 0 && user_invites) {
      setAllActivities(fetched_activities)
    } else {
      setAllActivities([])
    }
  }, [invited_activities, fetched_activities])



  useEffect(() => {
    if (allActivities.length > 0) {
      // console.log("check all activities: ", allActivities)
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


  // Modal controllers
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
      const invitesByID = getInvitedsByID(activity)
      const currentGuests = getInvitesByID(activity).map((invite) => {
        return {
          _id: invite.guest,
          username: invite.guestname
        }
      })
      console.log("check setPotentialInvite result: ", currentGuests, " act.name: ", activity.name, " actvityID:", activity._id , " invitesByID = ", invitesByID)
      setPotentialInvites(currentGuests)

      if (event.target.name === "addfriend") {
        nextPage()
      }
      setShow(true)
    }
  };


  // search filter

  const [filGuests, setFilGuests] = useState([])
  const [value, setValue] = useState("")
  const [potentialInvites, setPotentialInvites] = useState([])
  const handleInvite = (guest) => {
    const guestExists = potentialInvites.some((existingGuest) => existingGuest._id === guest._id);
    if (guestExists) {
      return;
    }

    const newInvites = [...potentialInvites, guest]
    setPotentialInvites(newInvites)
  }
  const onWordTyped = (e) => {
    setValue(e.target.value)
  }

  const handleRemove = (guestToRemove) => {
    const newInvites = potentialInvites.filter((guest) => guest !== guestToRemove)
    setPotentialInvites(newInvites)
  }

  useEffect(() => {
    if (user) {
      dispatch(getGuests())
    }
  }, [dispatch, user])

  useEffect(() => {
    // filter guest by word 
    const users = guests.filter((guest) => guest.username.toLowerCase().trim().startsWith(value.toLowerCase().trim()))
    setFilGuests(users)
  }, [value, guests])



  // helper functions
  const getInvitedsByID = (act) => {
    let invites = []
    if (act.host !== user._id) {
      invites = user_inviteds.filter((invite) => invite.activity === act._id);
    }
    return invites;
  }
  const getInvitesByID = (act) => {
    let invites = []
    if (act.host === user._id) {
      invites = user_invites.filter((invite) => invite.activity === act._id);
      // console.log("ATTENSTION: invites = ", invites, " act.name = " ,act.name, " user.invites = ", user_invites)
    }
    return invites;
  }


  const handleDelete = (act) => {
    if (act.host === user._id) {
      dispatch(deleteActivity(act._id))
      dispatch(deleteInvitesByActivityID(act._id))
    }
    else {
      showSuccessToast("Deleting invitation")
      const inviteds = getInvitedsByID(act)
      console.log("TO be deleted: ", inviteds)
      
        // remove all invited_activities in redux
      dispatch(removeInvitedActivitiesByID(act._id))
    
      // remove all invites in db
      dispatch(deleteInvited(inviteds))

    }

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
                      <h5 className="mb-1">{act.name} {act.host !== user._id && getInvitedsByID(act).length > 0 ? "- Host: " + getInvitedsByID(act)[0].hostname : ""}</h5>
                      <button type="button" className="btn-close" aria-label="Close"
                        onClick={() => handleDelete(act)}>
                      </button>
                    </div>

                    <small>{act.date} | {act.from} to {act.to} | {getWeatherWidget(act.weather, 24, "#000")} {act.weather}</small> <br />


                    <small>Location: {act.city}</small>


                    <p className="mb-1">{act.note}</p>

                    <div className="d-flex w-100 justify-content-between">
                      {act.host === user._id ? (<div>
                        <button type="button" name="edit" className="btn btn-warning btn-sm mt-2" onClick={(e) => handleShow(e, act)}>Edit information</button>
                        <button type="button" name="addfriend" className="btn btn-primary btn-sm mt-2" onClick={(e) => handleShow(e, act)} style={{ marginLeft: "0.5rem" }}>Add Friend</button>
                      </div>
                      ) :
                        (
                          <>
                            <div>
                              <button type="button" name="edit" className="btn btn-warning btn-sm mt-2" onClick={(e) => showErrorToast(`You do not have permission to edit information from host`)}>Edit information</button>
                              <button type="button" name="addfriend" className="btn btn-primary btn-sm mt-2" onClick={(e) => showErrorToast(`Your do not have permission to add friend from host`)} style={{ marginLeft: "0.5rem" }}>Add Friend</button>
                            </div>
                          </>
                        )}



                      <div>

                        {getInvitedsByID(act).map((invite) => (
                          <button type="button" key={invite._id} className="btn btn-danger btn-sm mt-2" style={{ marginLeft: "0.5rem" }}>{invite.hostname} (host) </button>
                        ))}

                        {getInvitesByID(act).map((invite) => (
                          <button type="button" key={invite._id} className="btn btn-success btn-sm mt-2" style={{ marginLeft: "0.5rem" }}>{invite.guestname} </button>
                        ))}
                      </div>
                    </div>


                  </div>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                      {activePage === 1 ? (
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

                          <Form.Group>

                            <InputGroup>
                              <span className="input-group-text bg-white border-end-0"><BiSearch /></span>
                              <Form.Control
                                type="search"
                                className="border-start-0"
                                placeholder="Search here.."
                                value={value}
                                onChange={onWordTyped}
                              />
                            </InputGroup>
                            <ul className="list-group" style={{ maxHeight: " 200px", overflowY: "scroll" }}>

                              {
                                filGuests.map((guest) => (

                                  <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center" key={guest._id} style={{ cursor: "pointer" }} onClick={() => handleInvite(guest)}>
                                    <div> <HiUserCircle size={24} className="me-2" />
                                      {guest.username}
                                    </div>

                                  </li>
                                ))
                              }

                            </ul>
                          </Form.Group>

                          <Form.Group className="mt-1">
                            <Form.Label className="ms-1" style={{ fontSize: '10px', color: '#999999' }}>Invite list</Form.Label>
                            <ul className="list-group" style={{ maxHeight: " 250px", overflowY: "scroll" }}>

                              {
                                potentialInvites.map((invite) => (
                                  <li className="list-group-item  d-flex justify-content-between align-items-center" key={invite._id}>
                                    <div> <HiUserCircle size={24} className="me-2" />
                                      {invite.username}
                                    </div>

                                    <Button variant="primary" onClick={() => handleRemove(invite)}>
                                      Remove
                                    </Button>
                                  </li>
                                ))
                              }



                            </ul>
                          </Form.Group>


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