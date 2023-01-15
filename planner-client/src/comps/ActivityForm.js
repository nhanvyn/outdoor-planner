import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import "./ActivityForm.css"

const ActivityForm = () => {


  
  return (
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

  )
};

export default ActivityForm;