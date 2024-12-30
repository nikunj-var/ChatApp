import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axiosInstance from "../api/axiosInstance";

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
  try {
    const response = await axiosInstance.get(`/message/chat-history/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching : ", error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axiosInstance.get("/user/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching  : ", error);
    throw error;
  }
};

export const getChatId = async ({ id1, id2 }) => {
  try {
    const response = await axiosInstance.post(`/chat/createChat/${id1}/${id2}`);
    return response?.data;
  } catch (err) {
    alert.error(err);
  }
};

export const sendMessage = async (message) => {
  try {
    const response = await axiosInstance.post("/message/sendMessage", message, {
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

export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post("/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("authToken", "nikunj");
    return response;
  } catch (error) {
    console.error("Error in API call:", error);
    return error;
  }
};

export { stompClient };
