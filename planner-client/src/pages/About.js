
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const About = () => {


  return (

    <div className='about'>
      <Container className="w-75" >
        <h2>About OutPlanner</h2>
        <p>
          OutPlanner is your go-to web application for planning your trips, checking the weather, and saving your activities and trips into your account. Whether you're exploring new destinations or planning a weekend getaway, OutPlanner makes it easy and enjoyable.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>Plan your trip:</strong> Choose your destination, dates, and activities, and OutPlanner will save it for you
          </li>
          <li>
            <strong>Check the weather:</strong> Stay informed about the current weather and forecasts for your destination, ensuring that you're always prepared for your trip.
          </li>
          <li>
            <strong>Save your activities and trips:</strong> Keep track of your planned trips and activities by saving them to your account.
          </li>
          <li>
            <strong>Invite others to your trip:</strong> Traveling with friends or family? Invite them to your trip and collaborate on the planning process.
          </li>
          <li>
            <strong>Edit and update trip information:</strong> Easily make changes to your trip details and keep everyone in the loop with real-time updates.
          </li>
          
        </ul>
  
    
      </Container>

    </div>


  )
};

export default About;