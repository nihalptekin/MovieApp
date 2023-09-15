import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";
import Navbar from "../components/Navbar";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        {/* detailsten sonra ne gelirse gelsin detail sayfasinda render et. bunun icin /: yapariz. isim önemli degil biz id dedik */}
        <Route path="/details/:id" element={<PrivateRouter />}>
          <Route path="" element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
