import React, { useState } from "react";
import "./adminHeader.scss";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { MdLightMode, MdOutlineNightlightRound } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

function AdminHeader({ setClose }) {
  const [hide, setHide] = useState(null)
  return (
    <div className="products__top">
      <button className="products__top-btns" onClick={() => setClose((p) => !p)}>
        <AiOutlineMenu />
      </button>

      <div className="products__top__right">
        <div className="products__top__right-form">
          <input placeholder="search..." type="text" />
          <FiSearch />
        </div>

        <div className="products__top__right-mode">
          <button onClick={() => setHide(p => !p)} className="products__top__right-mode-btn">
            {
              hide
                ?
                <MdLightMode />
                :
                <MdOutlineNightlightRound />
            }
          </button>
        </div>

        <div className="products__top__right-profile">
          <button className="products__top__right-profile-btn">
            <FaRegUser />
          </button>
          <p className="products__top__right-profile-title">RamziddinBek</p>
        </div>
        
      </div>
    </div>
  );
}

export default AdminHeader;

