
import React from 'react';
import {useState, useEffect, useRef} from 'react'
import './App.css';


/* Function Component for Interfacing to the Flask server*/
function ServerRequest()
{
  const serverRequestTextField = useRef();
  const space = "\n\n\n";
  const [serverResponse, setServerResponse] = useState("Waiting for user to enter a request");
  const [serverNames, setServerNames] = useState({});
  
  function checkNames()
  {
    // Pass along the firstname specified by the input to the flask backend
    let firstname = serverRequestTextField.current.value;
    console.log("The current response: " + serverResponse);
    fetch("/names/" + firstname).then(res => res.json()).then(data => {
      setServerResponse(data.response);
    });
    console.log("The server repsonse is now : " + serverResponse);
  }
  return(    
  <>
    <h2> Enter your request to the server here</h2>
    <div>
      <input  ref = {serverRequestTextField} type = "text" placeholder = "Enter a firstname:(try William)" size = "21"/>
      <button onClick = {() => {checkNames()}}>Enter the request</button>
    </div>
    <h4>
    Server Responses: {serverResponse}
    </h4>
  </>);
}

/* Additional function component to further practice and develop my understanding of the relationship between flask and react*/
function AddNewNames()
{
  const firstnameTextField = useRef();
  const lastnameTextField = useRef();
  const [serverResponse, setServerResponse] = useState("");
  // Clear the response temporarily
  function addNames()
  {
    let firstname = firstnameTextField.current.value;
    let lastname  = lastnameTextField.current.value;
    // fetch and set the values
    console.log("Attempting to add: " + firstname + " and " + lastname +  " to the backend");
    let nameString = firstname + "-" + lastname;
    fetch("/addnames/" + nameString).then(res => res.json()).then(data => {
      setServerResponse(data.response);
    });
  }
  return(
  <>
    <div>
      <h3>Enter a new new set of names</h3>
      <div>
        <div>Firstname Entry</div>
        <input  ref = {firstnameTextField} type = "text" placeholder = "Enter a firstname:(try Abhay)" size = "21"></input>
      </div>
        <div>Lastname Entry</div>
        <input ref = {lastnameTextField} type = "text" placeholder = "Enter a lastname:(try Samant)" size = "21"></input>
      <div>
      </div>
      <button onClick = {() => addNames()}>Enter new name pair</button>
      <label>{serverResponse}</label>
    </div>
  </>
  );
}


function App() {
  const [currentTime, setCurrentTime] = useState(0);

  return (
   <>
    <h1>Homework 6: Flask +  React + Heroku</h1>
    <div>
      <ServerRequest/> 
    </div>
    <div>
      NOTE: Might Require more than one click of enter
    </div>
    <AddNewNames/>
   </>
  );
}

export default App;
