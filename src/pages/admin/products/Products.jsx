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
  productName: "",
  brandId: "",
  productRang: "",
  comingPrice: "",
  mainAmount: "",
  camingItogo: "",
  sizes: [], 
};

const Products = () => {
  const { formData, setFormData, handleChange } = useGetValue(initialState);

  const [createProduct] = useCreateProductMutation();
  const [createModal, setCreateModal] = useState(false);

  const { data: products = [], isLoading } = useGetProductsQuery();
  const { data: brandData = [], } = useGetBrandsQuery();
  



  if (isLoading) return null;

  // 🔹 Umumiy mahsulot soni (sizes dan)
  const totalAmount = formData.sizes.reduce(
    (sum, s) => sum + Number(s.count || 0),
    0
  );
  

  // 🔹 Itogo AUTO hisoblanadi
  const itogo = Number(formData.comingPrice || 0) * totalAmount;
  

  // 🔹 Create product
  const createHandleProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: uuidv4(),
      productName: formData.productName,
      productRang: formData.productRang,
      comingPrice: Number(formData.comingPrice),

      comingTotalAmount: totalAmount,
      currentAmount: totalAmount,

      camingItogo: itogo, // ✅ DB ga yoziladi

      sizes: formData.sizes.map((s) => ({
        size: s.size,
        count: Number(s.count),
      })),

      brandId: formData.brandId,
      // brandName: formData.brandName,

      createdAt: new Date().toISOString(),
    };

    createProduct(newProduct);
    setFormData(initialState);
    setCreateModal(false);
  };

  const allSizes = ["S", "M", "L", "XL", "2XL", "50", "52", "54"];

  const handleAddSize = (e) => {
    const size = e.target.value;
    if (!size) return;

    setFormData((prev) => {
      if (prev.sizes.find((s) => s.size === size)) return prev;

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
        <h2>Maxsulotlar</h2>
        <button onClick={() => setCreateModal(true)}>Mahsulot yaratish</button>
      </div>

        {/* SCROLL FAQAT SHU YERDA */}
  <div className="product-cards">
    
    <table className="responsive-table">
      <thead>
        <tr>
          <th>Brand</th>
          <th>Nomi</th>
          <th>Rangi</th>
          <th>Soni</th>
          <th>Narxi</th>
          <th>Itogo</th>
          <th>Razmerlar</th>
          <th>Sana</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => {
          const brand = brandData.find(
            (b) => String(b.id) === String(product.brandId)
          );

          return (
            <tr key={product.id}>
              <td data-label="brand">{brand?.brandName || "—"}</td>
              <td data-label="nomi">{product.productName}</td>
              <td data-label="rangi">{product.productRang}</td>
              <td data-label="soni">{product.currentAmount}</td>
              <td data-label="narxi">{product.comingPrice}</td>
              <td data-label="itogo">{product.camingItogo}</td>
              <td data-label="razmerlari">
                {product.sizes?.map((s) => (
                  <div key={s.size}>
                    {s.size}: {s.count}
                  </div>
                ))}
              </td>
              <td data-label="sana">
                {new Date(product.createdAt).toLocaleDateString("uz-UZ")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    
  </div>

      {/* ================= MODAL ================= */}

      {createModal && (
        <Modal close={setCreateModal} title="Mahsulot yaratish">
          <form className="product-forma" onSubmit={createHandleProduct}>

            <label>
              <span>Brand:</span>
              <select
                value={formData.brandId}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedBrand = brandData.find(
                    (b) => b.id === selectedId
                  );

                  setFormData((prev) => ({
                    ...prev,
                    brandId: selectedId,
                    brandName: selectedBrand ? selectedBrand.name : "",
                  }));
                }}
                required
              >
                <option value="">Brand tanlang</option>
                {brandData.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.brandName}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Nomi:</span>
              <input
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Rangi:</span>
              <input
                name="productRang"
                value={formData.productRang}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Narxi:</span>
              <input
                type="number"
                name="comingPrice"
                value={formData.comingPrice}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              <span>Razmer qo‘shish:</span>
              <select onChange={handleAddSize} defaultValue="">
                <option value="">Tanlang</option>
                {allSizes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <div className="sizes-list">
              {formData.sizes.map((s) => (
                <div key={s.size} className="size-row">
                  <span>{s.size}</span>
                  <input
                    type="number"
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

            {/* 🔥 AUTO ITOGO */}
            <label>
              <span>Itogo:</span>
              <input value={itogo} readOnly />
            </label>

            <button className="btn">Create</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Products;
