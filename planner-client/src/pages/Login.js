
import { Container } from "react-bootstrap";
import "./Login.css"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
const Login = () => {

  const [formData, setFormData] = useState({
    name: '',
    password1: '',

  })


  const onChange = (e) => {

    setFormData((prevState) => {
      const newFormData = { ...prevState, [e.target.name]: e.target.value }
      return newFormData
    })
    console.log(formData)
    console.log(`Name: ${e.target.name}, Value: ${e.target.value}, Type: ${e.target.type}, Placeholder: ${e.target.placeholder}`)
  }


  const onSubmit = (e) => {
    e.preventDefault()


  }
  return (

    <div className='login'>
      <Container className="w-50">
        <Form onSubmit={onSubmit}>
          <h1 className='text-center'>LOGIN</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="Enter your Username"
              name='name'
              value={formData.name}
              onChange={onChange}
              required
            />

          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name='password1'
              value={formData.password1}
              onChange={onChange}
              required
            />


          </Form.Group>
          <div className="mt-3 d-flex justify-content-center gap-2 mb-5">


            <Button type="submit">
              Login
            </Button>

          </div>
        </Form>

      </Container>

    </div>


  )
};

export default Login;