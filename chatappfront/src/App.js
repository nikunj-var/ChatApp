import React, { useEffect, useState } from "react";
import ChatWindow from "./containers/ChatWindow";
import "./App.css";
import SideChat from "./containers/SideChat";
import { getChatId } from "./services/api";
import RegisterForm from "./auth/register";
import Login from "./auth/login";

const App = () => {
  const [user2, setUser2] = useState(localStorage.getItem("user2"));
  const [chatId, setChatId] = useState(1);

  useEffect(() => {
    const getId = async () => {
      const res = await getChatId({ id1: 2, id2: user2 });
      setChatId(res?.id);
    };
    getId();
  }, [user2]);

  return (
    <>
      <div className="container">
        {/* <div className="side-chat">
          <SideChat setUser2={setUser2} />
        </div>

        <div className="chat-window">
          <ChatWindow chatId={chatId} currentUserId={2} />
        </div> */}
      </div>

      <RegisterForm />
      <Login />
    </>
  );
};

export default App;
