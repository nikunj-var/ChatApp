import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import "./style.css";

import {
  connectWebSocket,
  fetchMessages,
  sendMessage,
  sendWebSocketMessage,
  stompClient,
} from "../services/api";

const ChatWindow = ({ chatId, currentUserId }) => {
  console.log("chatId", chatId);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      if (chatId) {
        const data = await fetchMessages(chatId);
        setMessages(data);
      }
    };

    loadMessages();
  }, [chatId]);

  const addMessage = (message) => {
    setMessages((prevMessage) => [...prevMessage, message]);
  };

  useEffect(() => {
    connectWebSocket(addMessage);
    return () => {
      if (stompClient && stompClient?.disconnect) {
        stompClient?.disconnect();
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      chatId,
      senderId: currentUserId,
      content: newMessage,
    };

    sendWebSocketMessage(message);
    addMessage(message);
  };

  return (
    <div className="chat-window">
      <div className="message-list">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            isOwnMessage={msg?.user?.id === currentUserId}
          />
        ))}
      </div>
      <MessageInput
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onSend={handleSendMessage}
      />
    </div>
  );
};

export default ChatWindow;
