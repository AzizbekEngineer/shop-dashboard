import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Codes from "./pages/admin/codes/Codes";
import Admin from "./pages/admin/Admin";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Brands from "./pages/admin/brands/Brands";
import Products from "./pages/admin/products/Products";

const App = () => {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="brands" element={<Brands />} />
        <Route path="products" element={<Products />} />
        <Route path="codes" element={<Codes />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
