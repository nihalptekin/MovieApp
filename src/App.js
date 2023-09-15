import React from "react";
import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import MovieContextProvider from "./context/MovieContext";
import AuthContextProvider from "./context/AuthContext";


const App = () => {
  return (
    <div className="dark:bg-[#23242a] min-h-screen">
      <AuthContextProvider>
        <MovieContextProvider>
          <AppRouter/>
          <ToastContainer />
        </MovieContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
