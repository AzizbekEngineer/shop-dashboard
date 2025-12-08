import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Gifts from "./pages/admin/gifts/Gifts";
import Codes from "./pages/admin/codes/Codes";
import Admin from "./pages/admin/Admin";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Brands from "./pages/admin/brands/Brands";

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="brands" element={<Brands />} />
        <Route path="gifts" element={<Gifts />} />
        <Route path="codes" element={<Codes />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
