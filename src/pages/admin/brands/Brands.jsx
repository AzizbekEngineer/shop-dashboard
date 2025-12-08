import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./brands.scss";
import {
  useCreateBrandMutation,
  useGetBrandsQuery,
} from "../../../context/api/brandsApi";
import Modal from "../../../companents/Modal/Modal";
import { useGetValue } from "../../../hook/useGetValue";

const initialState = {
  name: "",
  id: uuidv4(),
};

const Brands = () => {
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const { data: dataBrand } = useGetBrandsQuery();
  const [createModal, setCreateModal] = useState(false);
  console.log(dataBrand);

  const [createCategory, { data, isSuccess }] = useCreateBrandMutation();
  const createHandleCategory = (e) => {
    e.preventDefault();
    createCategory(formData);
    console.log(formData);
    setFormData(initialState);
    // navigate("/admin/manageCategory");
  };

  return (
    <div className="brand">
      <div className="brand__top">
        <h2>Bandlar</h2>
        <button onClick={() => setCreateModal(true)}>Brand yaratish</button>
      </div>
      <div className="brand__cards"></div>
      {/* Create modal */}
      {createModal && (
        <Modal close={setCreateModal} title={"Brand yaratish"}>
          <form onSubmit={createHandleCategory} action="">
            <input
              required
              value={formData.name}
              onChange={handleChange}
              name="name"
              placeholder="brand"
              type="text"
            />
            <button>Create</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Brands;
