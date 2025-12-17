import "./sell.scss";
import { useGetValue } from "../../../../hook/useGetValue";
import { useGetBrandsQuery } from "../../../../context/api/brandsApi";
import { useGetProductsQuery } from "../../../../context/api/productsApi";

const initialState = {
  brandId: "",
  productId: "",
  cellPrice: "",
  sizes: [], // { size, count }
};

const Sell = () => {
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const { data: brandData = [] } = useGetBrandsQuery();
  const { data: products = [], isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;

  const selectedProduct = products.find((p) => p.id === formData.productId);

  // 🔹 size qo‘shish / yangilash
  const handleSizeChange = (size, count) => {
    setFormData((prev) => {
      const exists = prev.sizes.find((s) => s.size === size);

      if (exists) {
        return {
          ...prev,
          sizes: prev.sizes.map((s) =>
            s.size === size ? { ...s, count: Number(count) } : s
          ),
        };
      }

      return {
        ...prev,
        sizes: [...prev.sizes, { size, count: Number(count) }],
      };
    });
  };

  const removeSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s.size !== size),
    }));
  };

  // 🔹 sotilgan umumiy son
  const soldTotal = formData.sizes.reduce(
    (sum, s) => sum + Number(s.count || 0),
    0
  );

  // 🔹 itogo (sotuv summasi)
  const itogo =
    soldTotal * Number(formData.cellPrice || selectedProduct?.price || 0);

  // ================= SELL =================
  const handleSellProduct = async (e) => {
    e.preventDefault();

    if (!selectedProduct || formData.sizes.length === 0) {
      alert("Kamida bitta razmer kiriting!");
      return;
    }

    // 🛑 tekshiruv
    for (let sell of formData.sizes) {
      const stock = selectedProduct.sizes.find((s) => s.size === sell.size);

      if (!stock || stock.count < sell.count) {
        alert(`${sell.size} razmerda yetarli mahsulot yo‘q`);
        return;
      }
    }

    // 🔹 sizes yangilash
    const updatedSizes = selectedProduct.sizes.map((s) => {
      const sold = formData.sizes.find((fs) => fs.size === s.size);
      return sold ? { ...s, count: s.count - sold.count } : s;
    });

    const newCurrentAmount = updatedSizes.reduce((sum, s) => sum + s.count, 0);

    const updatedProduct = {
      ...selectedProduct,
      sizes: updatedSizes,
      currentAmount: newCurrentAmount,
      itogo: newCurrentAmount * selectedProduct.price,
    };

    // 🔹 DB ga yozish
    await fetch(`http://localhost:3000/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    alert("Mahsulot muvaffaqiyatli sotildi ✅");

    setFormData(initialState);
  };

  return (
    <div className="sell">
      <h3 className="sell-title">Mahsulot sotish</h3>

      <form className="sell-forma" onSubmit={handleSellProduct}>
        {/* BRAND */}
        <label>
          <span>Brand:</span>
          <select
            name="brandId"
            value={formData.brandId}
            onChange={handleChange}
            required
          >
            <option value="">Brand tanlang</option>
            {brandData.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </label>

        {/* PRODUCT */}
        <label>
          <span>Mahsulot:</span>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            disabled={!formData.brandId}
          >
            <option value="">Mahsulot tanlang</option>
            {products
              .filter((p) => p.brandId === formData.brandId)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </select>
        </label>

        {/* SIZES */}
        {selectedProduct && (
          <div className="sell-forma-addSizes">
            {selectedProduct.sizes.map((s) => (
              <div key={s.size} className="sell-forma-addSizes-row">
                <span>
                  {s.size} ({s.count} ta bor)
                </span>

                <input
                  type="number"
                  min="0"
                  placeholder="sotildi"
                  onChange={(e) => handleSizeChange(s.size, e.target.value)}
                />

                <button type="button" onClick={() => removeSize(s.size)}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        {/* PRICE */}
        <label>
          <span>Sotuv narxi:</span>
          <input
            type="number"
            name="cellPrice"
            value={formData.cellPrice}
            onChange={handleChange}
            placeholder={`Default: ${selectedProduct?.price || 0}`}
          />
        </label>

        {/* ITOGO */}
        <div className="sell-itogo">
          <strong>Itogo:</strong> {itogo}
        </div>

        <button type="submit">Sell</button>
      </form>
    </div>
  );
};

export default Sell;
