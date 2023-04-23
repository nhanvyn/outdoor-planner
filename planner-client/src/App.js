import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";


import Layout from "./pages/Layout.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import Navigation from "./comps/Navigation";
import Activity from "./pages/Activity.js";
import { Container } from "react-bootstrap";
import { useState } from "react";

function App() {



  return (
    <>
      <BrowserRouter>

        <div className="App">
          <Navigation />

          <Routes>

            <Route path="/" element={<Layout />} />

            <Route path="/Activities" element={<Activity />} />


            <Route path="/Contact" element={

              <Container>
                <p>Contact me at: abc@example.ca </p>
              </Container>

            } />

            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />

          </Routes>



        </div>
      </BrowserRouter>
      <ToastContainer />
    </>


  );
}

export default App;
