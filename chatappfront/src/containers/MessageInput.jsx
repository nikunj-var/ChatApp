import React from "react";
import "./style.css";

const MessageInput = ({ value, onChange, onSend }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSend();
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        placeholder="Type a message"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
};

export default MessageInput;
