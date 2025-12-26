import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./sidebar.scss";
import { FaArrowLeft, FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { TbUsers } from "react-icons/tb";
import { LiaGiftSolid } from "react-icons/lia";
import { GoCodeSquare } from "react-icons/go";
// import { useDispatch } from "react-redux";

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
              <LiaGiftSolid />
              Sell Products
            </NavLink>
          </li>
          <li className="sidebar__list">
            <NavLink to={"brands"} className={"sidebar__left__text"}>
              <TbUsers />
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
              <GoCodeSquare />
              Statistica
            </NavLink>
          </li>
          <li className="sidebar__list">
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
          </li>
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
