import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';





const ActivityForm = () => {

  return (
    <Form className='mt-4'>
      <h1 className='text-center'>Add a new outdoor activity</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="city" placeholder="Activity name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="city" placeholder="Where to?" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">

        <Form.Control type="Date" placeholder="" />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Button>
          Check Weather
        </Button>

        <Button>
          Add to plan
        </Button>
        
      </Form.Group>
     
    </Form>
    
  )
};

export default ActivityForm;