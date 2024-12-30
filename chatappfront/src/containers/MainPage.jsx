import React, { useState } from "react";
import SideChat from "./SideChat";
import ChatWindow from "./ChatWindow";

const MainPage = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  return (
    <div>
      {" "}
      <div className="app-layout">
        <div className="side-chat">
          {user ? <SideChat setUser2={user} /> : <div>No user found!</div>}
        </div>
        <div className="chat-window">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
