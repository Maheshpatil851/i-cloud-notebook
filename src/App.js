
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import Home from './Components/Home';
import Notestate from './context/notes/Notestate';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { useState } from 'react';


function App() {
  const [alert, SetAlert] = useState(null)
  const ShowAlert = (msg, type) => {
    SetAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      SetAlert(null);

    }, 1500);

  }
  return (
    <>
      <Notestate>
        <Router>
 
      
          <Navbar />
          <Alert alert={alert} />
        
          <div className='container'>
            <Switch>
              <Route exact path="/">
                <Home ShowAlert={ShowAlert} />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/no">
              </Route>
              <Route exact path="/login">
                <Login ShowAlert={ShowAlert} />
              </Route>
              <Route exact path="/signup">
                <Signup ShowAlert={ShowAlert} />
              </Route>
            </Switch>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;

