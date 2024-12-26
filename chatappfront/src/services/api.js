import { Stomp } from "@stomp/stompjs";
import axios from "axios";
import SockJS from "sockjs-client";

const API_BASE_URL = "http://localhost:8080";

let stompClient = null;

export const connectWebSocket = (onMessageRecieved) => {
  const socket = new SockJS("http://localhost:8080/ws");
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("connected to websocket");
    stompClient.subscribe("/topic/messages", (message) => {
      const parsedMessage = JSON.parse(message?.body);
      onMessageRecieved(parsedMessage);
    });
  });
};

export const sendWebSocketMessage = (message) => {
  if (stompClient && stompClient.connected) {
    stompClient.send("/app/sendMessage", {}, JSON.stringify(message));
  } else {
    console.error("Websocket is not connected");
  }
};

export const fetchMessages = async (chatId) => {
  const response = await axios.get(
    `${API_BASE_URL}/message/chat-history/${chatId}`
  );
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/user/all`);
  return response.data;
};

export const getChatId = async ({ id1, id2 }) => {
  const response = await axios.post(
    `${API_BASE_URL}/chat/createChat/${id1}/${id2}`
  );
  return response?.data;
};

export const sendMessage = async (message) => {
  const url = `${API_BASE_URL}/message/sendMessage`;
  try {
    const response = await axios.post(url, message, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        response?.statusText
          ? response?.statusText
          : "Network response was not ok"
      );
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in API call:", error);
    return error;
  }
};

export { stompClient };
