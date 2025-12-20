import "./sell.scss";
import { useGetValue } from "../../../../hook/useGetValue";
import { useGetBrandsQuery } from "../../../../context/api/brandsApi";
import { useGetProductsQuery } from "../../../../context/api/productsApi";

const initialState = {
  brandId: "",
  productId: "",
  cellPrice: "",
  sizes: [],
};

const Sell = () => {
  const { formData, setFormData, handleChange } = useGetValue(initialState);
  const { data: brandData = [] } = useGetBrandsQuery();
  const { data: products = [], isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Loading...</div>;

  const selectedProduct = products.find(
    (p) => p.id === formData.productId
  );

  /* ================= SIZE CHANGE ================= */
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

  /* ================= HISOB ================= */
  const soldTotal = formData.sizes.reduce(
    (sum, s) => sum + Number(s.count || 0),
    0
  );

  const sellPrice = Number(
    formData.cellPrice || selectedProduct?.comingPrice || 0
  );

  const soldItogo = soldTotal * sellPrice;

  /* ================= SELL ================= */
  const handleSellProduct = async (e) => {
    e.preventDefault();

    if (!selectedProduct || soldTotal === 0) {
      alert("Kamida bitta razmer kiriting!");
      return;
    }

    // ❗ Tekshiruv
    for (let sell of formData.sizes) {
      const stock = selectedProduct.sizes.find(
        (s) => s.size === sell.size
      );

      if (!stock || stock.count < sell.count) {
        alert(`${sell.size} razmerda yetarli mahsulot yo‘q`);
        return;
      }
    }

    /* ===== 1. SOLD REPORT ===== */
    const soldReport = formData.sizes.map((sell) => {
      const stock = selectedProduct.sizes.find(
        (s) => s.size === sell.size
      );

      return {
        size: sell.size,
        before: stock.count,
        sold: sell.count,
        after: stock.count - sell.count,
      };
    });

    /* ===== 2. PRODUCT UPDATE ===== */
    const updatedSizes = selectedProduct.sizes.map((s) => {
      const sold = formData.sizes.find((fs) => fs.size === s.size);
      return sold ? { ...s, count: s.count - sold.count } : s;
    });

    const newCurrentAmount = updatedSizes.reduce(
      (sum, s) => sum + s.count,
      0
    );

    const updatedProduct = {
      ...selectedProduct,
      sizes: updatedSizes,
      currentAmount: newCurrentAmount,
    };

    /* ===== 3. SALE DATA ===== */
    const saleData = {
      id: crypto.randomUUID(),
      productId: selectedProduct.id,
      productName: selectedProduct.productName,
      brandId: selectedProduct.brandId,
      brandName: selectedProduct.brandName,
      soldSizes: soldReport,
      sellPrice,
      totalSold: soldTotal,
      soldItogo,
      createdAt: new Date().toISOString(),
    };

    try {
      /* ===== 4. SAVE SALE ===== */
      await fetch("http://localhost:3000/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saleData),
      });

      /* ===== 5. UPDATE PRODUCT ===== */
      await fetch(
        `http://localhost:3000/products/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );

      alert("Mahsulot muvaffaqiyatli sotildi ✅");
      setFormData(initialState);
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi ❌");
    }
  };

  /* ================= JSX ================= */
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
                {b.brandName}
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
                  {p.productName}
                </option>
              ))}
          </select>
        </label>

        {/* SIZES */}
        {selectedProduct && (
  <div className="sell-forma-addSizes">
    {selectedProduct.sizes.map((s) => {
      const soldCount = formData.sizes.find(fs => fs.size === s.size)?.count || 0;
      return (
        <div key={s.size} className="sell-forma-addSizes-row">
          <span className="sell-forma-addSizes-row-span">
            {s.size} ({s.count} ta bor)
          </span>

          <input
            type="number"
            min="0"
            placeholder="sotildi"
            value={soldCount}
            onChange={(e) =>
              handleSizeChange(s.size, e.target.value)
            }
          />

          {/* ✕ button */}
          <button className="sell-forma-addSizes-row-btn"
            type="button"
            onClick={() => removeSize(s.size)}
            style={{
              
            }}
          >
            ✕
          </button>
        </div>
      );
    })}
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
            placeholder={`Default: ${selectedProduct?.comingPrice || 0}`}
          />
        </label>

        {/* ITOGO */}
        <div className="sell-itogo">
          <strong>Itogo:</strong> {soldItogo}
        </div>

        <button className="sell-forma-bottomBtn" type="submit">Sell</button>
      </form>
    </div>
  );
};

export default Sell;
