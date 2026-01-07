import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.scss";
import { LuLogOut } from "react-icons/lu";
import { LiaGiftSolid } from "react-icons/lia";
import { HiShoppingCart } from "react-icons/hi";
import { IoLayers } from "react-icons/io5";
import { VscPieChart } from "react-icons/vsc";

function Sidebar() {

  return (
    <section className="sidebar">
      <div>
        <Link to={"/"} className="sidebar__top">
          <h1>D.37</h1>
        </Link>
        <ul className="sidebar__item">
          <li className="sidebar__list">
            <NavLink to={"Sell"} className={"sidebar__left__text"}>
              <HiShoppingCart />
              Sell Products
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"brands"} className={"sidebar__left__text"}>
              <IoLayers />
              Brands
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"products"} className={"sidebar__left__text"}>
              <LiaGiftSolid />
              Products
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"Statistica"} className={"sidebar__left__text"} >
              <VscPieChart />
              Statistica
            </NavLink>
          </li>



          {/* <li className="sidebar__list">
            <NavLink to={"dashboard"} className={"sidebar__left__text"}>
              <RxDashboard />
              Dashboard
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"codes"} className={"sidebar__left__text"}>
              <GoCodeSquare />
              Codes
            </NavLink>
          </li> */}
        </ul>
      </div>
      <div className="sidebar__btns">
        <div className="sidebar__btns__info">
          <LuLogOut />
          <p className="sidebar__btns__info-text">Login out</p>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
