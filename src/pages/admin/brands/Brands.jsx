import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./brands.scss";
import {
  useCreateBrandMutation,
  useGetBrandsQuery,
} from "../../../context/api/brandsApi";
import Modal from "../../../companents/Modal/Modal";
import { useGetValue } from "../../../hook/useGetValue";

const initialState = {
  brandName: "",
  id: uuidv4(),
};

const Brands = () => {
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const { data: dataBrand } = useGetBrandsQuery();
  const [createModal, setCreateModal] = useState(false);
  // console.log(dataBrand);

  const [createCategory, { data, isSuccess }] = useCreateBrandMutation();
  const createHandleCategory = (e) => {
    e.preventDefault();
    createCategory(formData);
    console.log(formData);
    setFormData(initialState);
    setCreateModal(false)
    // navigate("/admin/manageCategory");
  };

  return (
    <div className="brand">
      <div className="brand__top">
        <h2>Bandlar</h2>
        <button onClick={() => setCreateModal(true)}>Brand yaratish</button>
      </div>

      {/* brends table */}
      <div className="brand__cards">
        {dataBrand?.map((el) => (
          <div key={el.id} className="brand__cards-card">
            <h3>{el?.brandName}</h3>
          </div>
        ))}
      </div>

      {/* Create modal */}
      {createModal && (
        <Modal
          className="brand-formm"
          close={setCreateModal}
          title={"Brand yaratish"}
        >
          <form
            className="brand-forma"
            onSubmit={createHandleCategory}
          >
            <label className="brand-forma-label" htmlFor="">
              brend nomini kiriting
              <input
                required
                value={formData.brandName}
                onChange={handleChange}
                name="brandName"
                placeholder="brand nomi"
                type="text"
              />
            </label>
            <button
              className="brand-forma-btn">
              Create
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Brands;
