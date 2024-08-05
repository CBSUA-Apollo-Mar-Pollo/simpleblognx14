"use client";

import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

const SocketTestComponent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("message", "Hello from Next.js!");
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default SocketTestComponent;
