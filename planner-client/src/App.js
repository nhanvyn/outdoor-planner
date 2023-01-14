import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'


import Weather from "./comps/Weather";
import Layout from "./comps/Layout";
import ActivityForm from "./comps/ActivityForm";
function App() {
  return (
    <div className="App">
      <Layout>
        <Weather/>
        
        <ActivityForm /> 
        
       
      </Layout>
    </div>
  );
}

export default App;
