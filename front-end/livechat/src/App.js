import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import './App.css';
let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("Unknown")

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", msg => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setMessages([...messages, msg]);
    });
  };

  // On Change
  const onChange = e => {
    setMessage(e.target.value);
  };
  const changeUsername =e=>{
    setUsername(e.target.value)
  }

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", username+": "+message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <div className="bg">
    <div>
    <h1 className="title">LiveChat Demo </h1>
    <div>
      <div className="ms_box">
      {messages.length > 0 &&
        messages.map(msg => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
        </div>
      <hr></hr>
      <input value={username} name="username" className="username_input" onChange={e=>changeUsername(e)}></input>
      <input value={message} name="message" onChange={e => onChange(e)} />
      <button onClick={() => onClick()}>Send Message</button>
    </div>
    </div>
    </div>
  );
};

export default App;