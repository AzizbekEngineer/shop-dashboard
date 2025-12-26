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
  price: "",
  count: "",
  itogo: "",
  sizes: [],
};

const Products = () => {
  const [createProduct] = useCreateProductMutation();
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const [createModal, setCreateModal] = useState(false);
  const { data: products, isLoading } = useGetProductsQuery();
  const { data: brandData } = useGetBrandsQuery();
  const { calcItogo, setcalcItogo } = useState(0);

  if (isLoading) return null;

  console.log(formData.price * formData.count);

  const createHandleProduct = (e) => {
    e.preventDefault();

    const selectedBrand = brandData.find((b) => b.id === formData.brandId);

    const newProduct = {
      id: uuidv4(),
      name: formData.name,
      rang: formData.rang,
      price: formData.price,
      count: formData.count,
      itogo: (formData.price * formData.count),
      sizes: formData.sizes,
      brand: {
        id: selectedBrand.id,
        name: selectedBrand.name,
      },
    };

    createProduct(newProduct);
    setFormData(initialState);
    setCreateModal(false);
  };

  const allSizes = ["S", "M", "L", "XL", "XXL", "50", "52", "54"];

  const handleAddSize = (e) => {
    const size = e.target.value;
    if (!size) return;

    setFormData((prev) => {
      if (prev.sizes.find((s) => s.size === size)) {
        return prev;
      }

      return {
        ...prev,
        sizes: [...prev.sizes, { size, count: "" }],
      };
    });
  };

  const handleSizeCountChange = (size, value) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s) =>
        s.size === size ? { ...s, count: Number(value) } : s
      ),
    }));
  };

  const removeSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s.size !== size),
    }));
  };

  return (
    <div className="product">
      <div className="product__top">
        <h2>Mahsulot</h2>
        <button onClick={() => setCreateModal(true)}>Mahsulot yaratish</button>
      </div>
      <div className="product-cards">
        {products && (
          <table>
            <thead>
              <tr>
                <th>nomi:</th>
                <th>rangi:</th>
                <th>soni:</th>
                <th>narxi:</th>
                <th>itogo:</th>
                <th>razmer s:</th>
                <th>sana:</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.rang}</td>
                  <td>{product.count}</td>
                  <td>{product.price}</td>
                  <td>{product.itogo}</td>
                  <td>
                    <div className="sizes-cell">
                      {product.sizes?.map((s) => (
                        <span key={s.size} className="size-badge">
                          {s.size}: {s.count} <br />
                        </span>
                      ))}
                    </div>
                  </td>

                  <td>12.15.2025</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {createModal && (
        <Modal
          className="moodal"
          close={setCreateModal}
          title={"Mahsulot yaratish"}
        >
          <form
            className="product-forma"
            action=""
            onSubmit={createHandleProduct}
          >
            <label className="product-forma-brends">
              <span>Brand nomi:</span>
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
              <span>Mahsulot nomi:</span>
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
              <span>Mahsulot rangi:</span>
              <input
                value={formData.rang}
                onChange={handleChange}
                name="rang"
                type="text"
                placeholder="Mahsulot rangi"
                required
              />
            </label>

            <label>
              <span>Mahsulot soni:</span>
              <input
                value={formData.count}
                onChange={handleChange}
                name="count"
                type="number"
                placeholder="Mahsulot soni"
                required
              />
            </label>

            <label className="product-forma-addSize">
              <span>Razmer qo‘shish</span>
              <select onChange={handleAddSize} defaultValue="">
                <option value="">Razmer tanlang</option>
                {allSizes.map((size) => (
                  <option className="addSize-option" key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>

            <div className="sizes-list">
              {formData.sizes.map((s) => (
                <div key={s.size} className="size-row">
                  <span className="size-name">{s.size}</span>

                  <input
                    type="number"
                    min=""
                    placeholder="soni"
                    value={s.count}
                    onChange={(e) =>
                      handleSizeCountChange(s.size, e.target.value)
                    }
                  />

                  <button type="button" onClick={() => removeSize(s.size)}>
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <label>
              <span>Mahsulot narxi:</span>
              <input
                value={formData.price}
                onChange={handleChange}
                name="price"
                type="number"
                placeholder="Mahsulot narxi"
                required
              />
            </label>

            <label>
              <span>Itogo:</span>
              <input
                value={formData.itogo}
                onChange={handleChange}
                name="itogo"
                type="text"
                placeholder="itogo"
              />
            </label>

            <button className="btn">Create</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Products;
