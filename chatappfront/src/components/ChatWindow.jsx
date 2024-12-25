import React, { useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import "./style.css";
import { fetchMessages, sendMessage } from "../services/api";

const ChatWindow = ({ chatId, currentUserId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadMessages = async () => {
      const data = await fetchMessages(chatId);
      setMessages(data);
    };

    loadMessages();
  }, [chatId]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const message = {
      chatId,
      senderId: currentUserId,
      content: newMessage,
    //   timestamp: new Date().toISOString(),
    };

    const savedMessage = await sendMessage(message);

    setMessages([...messages, savedMessage]);
    setNewMessage("");
  };

  return (
    <div className="chat-window">
      <div className="message-list">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            content={msg.content}
            isOwnMessage={msg.senderId === currentUserId}
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
