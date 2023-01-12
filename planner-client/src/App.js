import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

import { Button } from "react-bootstrap";
import Weather from "./comps/Weather";

function App() {
  return (
    <div className="App">
      <Weather/>
      <Button>Test Button</Button>
    </div>
  );
}

export default App;
