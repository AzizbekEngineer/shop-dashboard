import React from "react";
import "./modal.scss";
import { IoMdClose } from "react-icons/io";

function Modal({ children, width, close, bg, title }) {
  return (
    <>
      <div
        style={{ backgroundColor: bg }}
        onClick={() => close(false)}
        className="overlay"
      ></div>
      <div style={{ width }} className="model">
        <div className="model__header">
          <h3 className="model__title">{title}</h3>
          <button onClick={() => close(false)} className="model__btn">
            <IoMdClose />
          </button>
        </div>
        <div className="model__children"> {children}</div>
      </div>
    </>
  );
}

export default Modal;
