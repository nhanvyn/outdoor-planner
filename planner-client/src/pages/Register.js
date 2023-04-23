
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../utils/toast';
import { register, reset } from "../features/auth/authSlice";

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    password1: '',
    password2: '',
  })
  const { name, password1, password2 } = formData


  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      showErrorToast(message)
    }
    if (user && message) {
      showSuccessToast(message)
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log(formData)
  }


  const onSubmit = (e) => {
    e.preventDefault()
    if (password1 !== password2) {
      showErrorToast("password does not match")
    } else {
      const userData = {
        "username": name,
        "password": password1,
      }
      dispatch(register(userData))
    }

  }

  return (

    <div className='register'>
      <Container className="w-25" style={{ border: "solid rgb(197, 184, 184) 0.5px " }} >
        <Form onSubmit={onSubmit}>
          <h1 className='text-center'>REGISTER</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="username"
              placeholder="Enter your Username"
              name='name'
              value={name}
              onChange={onChange}
              required
            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name='password1'
              value={password1}
              onChange={onChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name='password2'
              value={password2}
              onChange={onChange}
              required
            />
          </Form.Group>


          <div className="mt-3 d-flex justify-content-center gap-2 mb-5">


            <Button type="submit">
              Create Account
            </Button>

          </div>
        </Form>

      </Container>

    </div>


  )
};

export default Register;