import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


import Layout from "./comps/Layout";

import Navigation from "./comps/Navigation";
import ActivityList from "./comps/ActivityList";
import { Container } from "react-bootstrap";
import { useState } from "react";

function App() {

  

  return (
    <BrowserRouter>

      <div className="App">
        <Navigation />

        <Routes>
          <Route path="/" element={<Layout/>} />

          <Route path="/Activities" element={<ActivityList />} />


          <Route path="/Contact" element={

            <Container>
              <p>Contact me at: abc@example.ca </p>
            </Container>
            
          } />


        </Routes>



      </div>
    </BrowserRouter>

  );
}

export default App;
