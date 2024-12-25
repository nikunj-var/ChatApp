import React, { useEffect, useState } from "react";
import SockJs from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatWindow from "./components/ChatWindow";

const App = () => {
  // const [client, setClient] = useState(null);
  // const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState("");

  // useEffect(() => {
  //   const socket = new SockJs("http://localhost:8080/ws");

  //   const stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     onConnect: () => {
  //       console.log("connected");
  //       stompClient.subscribe("/topic/messages", (message) => {
  //         console.log("message", messages);
  //         setMessages((prevMessage) => [...prevMessage, message?.body]);
  //       });
  //     },
  //     onStompError: (error) => {
  //       console.error(error);
  //     },
  //   });
  //   stompClient.activate();
  //   setClient(stompClient);
  //   return () => stompClient.deactivate();
  // }, []);

  // const sendMessage = () => {
  //   if (client && newMessage.trim()) {
  //     console.log("message send s");
  //     client.publish({ destination: "/app/sendMessage", body: newMessage });
  //     setNewMessage("");
  //   }
  // };
  return (
    <div>
      {/* <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2>Mini Chat App</h2>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            height: "300px",
            overflowY: "auto",
          }}
        >
          {messages.map((msg, index) => (
            <div key={index} style={{ margin: "5px 0" }}>
              {msg}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%", padding: "10px", marginTop: "10px" }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "10px", marginLeft: "10px" }}
        >
          Send
        </button>
      </div> */}
      <ChatWindow chatId={2} currentUserId={1} />
    </div>
  );
};

export default App;
