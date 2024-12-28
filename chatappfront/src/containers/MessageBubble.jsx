import React from "react";
import "./style.css"; 

const MessageBubble = ({ content, isOwnMessage }) => {
  return (
    <div className={`message-bubble ${isOwnMessage ? "own" : "other"}`}>
      {content}
    </div>
  );
};

export default MessageBubble;
