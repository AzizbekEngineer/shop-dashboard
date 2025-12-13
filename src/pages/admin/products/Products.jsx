import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from "../../../context/api/productsApi";
import "./products.scss";
import Modal from "../../../companents/Modal/Modal";
import { useGetBrandsQuery } from "../../../context/api/brandsApi";
import { useGetValue } from "../../../hook/useGetValue";
const initialState = {
  name: "",
  brandId: "",
  rang: "",
};

const Products = () => {
  const [createProduct] = useCreateProductMutation();
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const [createModal, setCreateModal] = useState(false);
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: brandData } = useGetBrandsQuery();
  if (isLoading) return null;

  const createHandleProduct = (e) => {
    e.preventDefault();

    const selectedBrand = brandData.find((b) => b.id === formData.brandId);

    const newProduct = {
      id: uuidv4(),
      name: formData.name,
      rang: formData.rang,
      brand: {
        id: selectedBrand.id,
        name: selectedBrand.name,
      },
    };

    createProduct(newProduct);
    setFormData(initialState);
    setCreateModal(false);
  };

  return (
    <div className="product">
      <div className="product__top">
        <h2>Mahsulot</h2>
        <button onClick={() => setCreateModal(true)}>Mahsulot yaratish</button>
      </div>
      <div className="product-cards">
        {products &&
          products.map((product) => (
            <div className="product-cards-card">
              <h3>{product.name}:</h3>
              <p>
                rangi: <br /> {product.rang}
              </p>
              <p>
                soni: <br /> {product.count}
              </p>
              <p>
                narxi: <br /> {product.price}$
              </p>
              <p>
                itogo: <br /> {product.itogo}$
              </p>
            </div>
          ))}
      </div>

      {createModal && (
        <Modal close={setCreateModal} title={"Mahsulot yaratish"}>
          <form action="" onSubmit={createHandleProduct}>
            <label>
              <span>Brand nomi</span>
              <select
                name="brandId"
                value={formData.brandId}
                onChange={handleChange}
                required
              >
                <option value="">Brand tanlang</option>
                {brandData?.map((el) => (
                  <option key={el.id} value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Mahsulot nomi</span>
              <input
                value={formData.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Mahsulot nomi"
                required
              />
            </label>
            <label>
              <span>Mahsulot rangi</span>
              <input
                value={formData.rang}
                onChange={handleChange}
                name="rang"
                type="text"
                placeholder="Mahsulot rangi"
                required
              />
            </label>
            <button className="brand-forma-btn">Create</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Products;
