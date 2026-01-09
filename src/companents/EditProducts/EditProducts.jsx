import "./EditProducts.scss";
import { useState, useEffect } from "react";
import { useUpdateProductMutation } from "../../context/api/productsApi";






const EditProducts = ({ product, onClose }) => {
  const [editSizes] = useUpdateProductMutation()

  const [form, setForm] = useState({
    productName: "",
    productRang: "",
    comingPrice: "",
    currentAmount: "",
    camingItogo: "",
    sana: new Date().toISOString(),
    sizes: []
  });

  const [newSize, setNewSize] = useState({
    size: "",
    count: "",
  });

 const handleAddSize = () => {
  if (!newSize.size || Number(newSize.count) <= 0) return;

  const exists = form.sizes.some(
    (s) => s.size.toLowerCase() === newSize.size.toLowerCase()
  );

  if (exists) {
    alert("Bu razmer allaqachon mavjud");
    return;
  }

  setForm((prev) => ({
    ...prev,
    sizes: [
      ...prev.sizes,
      { size: newSize.size, count: Number(newSize.count) },
    ],
  }));

  setNewSize({ size: "", count: "" });
};


  const handleRemoveSize = (sizeName) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s.size !== sizeName),
    }));
  };

  const allSizes = ["S", "M", "L", "XL", "2XL", "50", "52", "54"];


  useEffect(() => {
    if (product) {
      setForm({
        productName: product.productName,
        productRang: product.productRang,
        comingPrice: product.comingPrice,
        currentAmount: product.currentAmount,
        camingItogo: product.camingItogo,
        sana: product.sana,
        sizes: product.sizes.map((s) => ({
          size: s.size,
          count: s.count,
        })),
      });
    }
  }, [product]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSizeChange = (sizeName, value) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.map((s) =>
        s.size === sizeName ? { ...s, count: Number(value) } : s
      ),
    }));
  };

  const editTotalAmount = form.sizes?.reduce(
    (acc, item) => acc + (item.count || 0),
    0
  );

  const editTotalItogo = Number(form.comingPrice || 0) * editTotalAmount;

const handelSubmit = async (e) => {
  e.preventDefault();

  const body = {
    productName: form.productName,
    productRang: form.productRang,
    comingPrice: Number(form.comingPrice),
    currentAmount: editTotalAmount,
    camingItogo: editTotalItogo,
    sizes: form.sizes,
  };

  try {
    await editSizes({
      id: product.id,
      body,
    }).unwrap();

    onClose();
  } catch (err) {
    console.error("Product update failed:", err);
  }
};

  return (
    <div className="editProduct">
      <div className="editProduct-editOverLay">
        <form
          className="editProduct-editOverLay-editForm"
          onSubmit={handelSubmit}
        >
          <label className="editProduct-editOverLay-editForm-label">
            <span className="editProduct-editOverLay-editForm-label-span">
              nomi:
            </span>
            <input
              className="editProduct-editOverLay-editForm-label-inp"
              type="text"
              name="productName"
              value={form.productName}
              onChange={handelChange}
            />
          </label>

          <label className="editProduct-editOverLay-editForm-label">
            <span className="editProduct-editOverLay-editForm-label-span">
              rangi:
            </span>
            <input
              className="editProduct-editOverLay-editForm-label-inp"
              type="text"
              name="productRang"
              value={form.productRang}
              onChange={handelChange}
            />
          </label>

          <label className="editProduct-editOverLay-editForm-label">
            <span className="editProduct-editOverLay-editForm-label-span">
              narxi:
            </span>
            <input
              className="editProduct-editOverLay-editForm-label-inp"
              type="number"
              name="comingPrice"
              value={form.comingPrice}
              onChange={handelChange}
            />
          </label>



              <label className="editProduct-editOverLay-editForm-label">
              <span>Razmer qo‘shish:</span>
              <select
  value={newSize.size}
  onChange={(e) =>
    setNewSize((prev) => ({ ...prev, size: e.target.value }))
  }
  className="editProduct-editOverLay-editForm-label-inp"
>
  <option value="">Tanlang</option>
  {allSizes.map((s) => (
    <option key={s} value={s}>
      {s}
    </option>
  ))}
</select>

            </label>

           <div className="addNewSize">

              <label className="editProduct-editOverLay-editForm-label addNewSize-label">
                <input className="editProduct-editOverLay-editForm-label-inp"
                type="number"
                placeholder="Soni"
                value={newSize.count}
                onChange={(e) =>
                  setNewSize((prev) => ({ ...prev, count: e.target.value })) } />
              </label>
              
              <button className="editProduct-editOverLay-editForm-btn addNewSize-btn" type="button" onClick={handleAddSize}>
                + Qo‘shish
              </button>
            </div>

          <div className="editSizes">
            {form.sizes?.map((s) => (
              <div key={s.size} className="editSizes-editSize">

                <span className="editSizes-editSize-span">{s.size}</span>

                <input className="editSizes-editSize-inp"
                  type="number"
                  value={s.count}
                  onChange={(e) => {
                    handleEditSizeChange(s.size, e.target.value); }} />

                <button className="editSizes-editSize-btn"
                type="button" onClick={() => handleRemoveSize(s.size)}> ❌ </button>

              </div>
            ))}
           
          </div>

          <button
            className="editProduct-editOverLay-editForm-btn"
            type="submit" >
                 saqlash
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProducts;
