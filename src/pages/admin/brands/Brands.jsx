import React, { useState } from "react";
import "./brands.scss";
import { useGetBrandsQuery } from "../../../context/api/brandsApi";
import Modal from "../../../companents/Modal/Modal";

const Brands = () => {
  const { data } = useGetBrandsQuery();
  const [createModal, setCreateModal] = useState(false);
  console.log(data);

  return (
    <div className="brand">
      <div className="brand__top">
        <h2>Bandlar</h2>
        <button onClick={() => setCreateModal(true)}>Brand yaratish</button>
      </div>
      <div className="brand__cards">
        
      </div>
      {/* Create modal */}
      {createModal && (
        <Modal close={setCreateModal} title={"Brand yaratish"}>
          <h1>Modal</h1>
        </Modal>
      )}
    </div>
  );
};

export default Brands;
