import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { getChatId } from "./services/authService";
import RegisterForm from "./auth/register";
import Login from "./auth/login";
import ProtectedRoute from "./route/ProtectedRoute";
import MainPage from "./containers/MainPage";

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Outlet />
    </div>
  );
};

const App = () => {
  const [user2, setUser2] = useState(localStorage.getItem("user2"));
  const [chatId, setChatId] = useState(1);

  useEffect(() => {
    const fetchChatId = async () => {
      if (user2) {
        const res = await getChatId({ id1: 2, id2: user2 });
        setChatId(res?.id);
      }
    };
    fetchChatId();
  }, [user2]);


  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout setUser2={setUser2} chatId={chatId} />
        </ProtectedRoute>
      ),
      children: [{ path: "/", element: <MainPage /> }],
    },
    {
      path: "/register",
      element: <RegisterForm />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
