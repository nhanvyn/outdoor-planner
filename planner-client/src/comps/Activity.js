


import { Container } from "react-bootstrap";
import "./Activity.css"
import { WiDaySunny, WiCloud } from 'weather-icons-react';
const ActivityList = () => {
  return (
    <div className='login'>
      <Container className="w-75" >
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Coffee </h5>
              <button type="button" className="btn-close" aria-label="Close"></button>
            </div>

            <small>02-01-2022 03:00PM</small> <WiDaySunny size={24} color='#111' style={{ marginBottom: "0.3rem" }} />
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <div className="d-flex w-100 justify-content-between">
              <div>
                <button type="button" className="btn btn-warning btn-sm mt-2" >Add Friend</button>
                <button type="button" className="btn btn-primary btn-sm mt-2" style={{ marginLeft: "0.5rem" }}>Add Friend</button>
              </div>
              <div>
                <button type="button" className="btn btn-success btn-sm mt-2" style={{ marginLeft: "0.5rem" }}>batman</button>
                <button type="button" className="btn btn-success btn-sm mt-2" style={{ marginLeft: "0.5rem" }}>hulk</button>
                <button type="button" className="btn btn-success btn-sm mt-2" style={{ marginLeft: "0.5rem" }}>wadwaoidi</button>
              </div>

            </div>

          </a>
          <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">Coffee</h5>
              <button type="button" className="btn-close" aria-label="Close"></button>
            </div>

            <small>02-01-2022 03:00PM</small> <WiCloud size={24} color='#111' style={{ marginBottom: "0.3rem" }} />
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <button type="button" className="btn btn-primary btn-sm mt-2">Add Friend</button>
          </a>
        </div>

      </Container>

    </div>
  )

};

export default ActivityList;