
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import { showSuccessToast, showErrorToast } from '../utils/toast';
import "./LogAndReg.css"
const Login = () => {

  const [formData, setFormData] = useState({
    username: '',
    password: '',

  })


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, message } = useSelector((state) => state.auth)
  useEffect(() => {
    if (isError) {
      showErrorToast(message)
    }
    if (user) {
      showSuccessToast(message)
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, navigate, dispatch])

  const onChange = (e) => {

    setFormData((prevState) => {
      const newFormData = { ...prevState, [e.target.name]: e.target.value }
      return newFormData
    })
    console.log(formData)
    console.log(`Name: ${e.target.value}`)
  }



  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))

  }
  return (

    <div className='login'>
      <Container className="custom-width" style={{ border: "solid rgb(197, 184, 184) 0.5px " }}>
        <Form onSubmit={onSubmit}>
          <h1 className='text-center'>LOGIN</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter your Username"
              name='username'
              value={formData.username}
              onChange={onChange}
              required
            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name='password'
              value={formData.password}
              onChange={onChange}
              required
            />


          </Form.Group>
          <div className="mt-3 d-flex justify-content-center gap-2 mb-5">

            {isLoading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
                <Button type="submit">
                  Login
                </Button>
            )}
           

          </div>
        </Form>

      </Container>

    </div>


  )
};

export default Login;