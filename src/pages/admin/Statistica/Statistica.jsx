import "./Statistica.scss";
import { useState, useMemo } from "react";
import { useGetBrandsQuery } from "../../../context/api/brandsApi";
import {
  useGetProductsQuery,
  useGetSalesQuery,
} from "../../../context/api/productsApi";

const Statistica = () => {
  // API
  const { data: soldProducts = [], isLoading } = useGetSalesQuery();
  const { data: products = [] } = useGetProductsQuery();
  const { data: brands = [] } = useGetBrandsQuery();

  // FILTER STATES
  const [brandId, setBrandId] = useState("");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minProfit, setMinProfit] = useState("");
  const [maxProfit, setMaxProfit] = useState("");

  // PRODUCTS MAP
  const productsMap = useMemo(() => {
    return products.reduce((acc, p) => {
      acc[p.id] = p;
      return acc;
    }, {});
  }, [products]);

  // PROFIT
  const getProfit = (sale) => {
    const product = productsMap[sale.productId];
    if (!product) return 0;
    return sale.soldItogo - sale.totalSold * product.comingPrice;
  };

  // FILTERED SALES
  const filteredSales = useMemo(() => {
    return soldProducts.filter((s) => {
      const saleDate = new Date(s.createdAt).toISOString().split("T")[0];
      const profit = getProfit(s);
      const productName = (s.productName || "").toLowerCase();

      if (brandId && s.brandId !== brandId) return false;
      if (search && !productName.includes(search.toLowerCase())) return false;

      if (minPrice && s.sellPrice < +minPrice) return false;
      if (maxPrice && s.sellPrice > +maxPrice) return false;

      if (minProfit && profit < +minProfit) return false;
      if (maxProfit && profit > +maxProfit) return false;

      // 👉 Bitta sana bo‘yicha filter
      if (selectedDate && saleDate !== selectedDate) return false;

      return true;
    });
  }, [
    soldProducts,
    brandId,
    search,
    selectedDate,
    minPrice,
    maxPrice,
    minProfit,
    maxProfit,
    productsMap,
  ]);

  // RESET
  const resetFilters = () => {
    setBrandId("");
    setSearch("");
    setSelectedDate("");
    setMinPrice("");
    setMaxPrice("");
    setMinProfit("");
    setMaxProfit("");
  };

  // LOADING
  if (isLoading) {
    return <div className="statistica loading">Yuklanmoqda...</div>;
  }

  return (
    <div className="statistica">
      {/* FILTERS */}
      <div className="filters">
        <select value={brandId} onChange={(e) => setBrandId(e.target.value)}>
          <option value="">Barcha brendlar</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.brandName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Mahsulot nomi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Bitta sana */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button className="resetBtn" onClick={resetFilters}>
          Tozalash
        </button>
      </div>

      {/* TABLE */}
      {filteredSales.length === 0 ? (
        <div className="empty">Maʼlumot topilmadi</div>
      ) : (
        <table className="statisticaTable">
          <thead>
            <tr>
              <th>Brend</th>
              <th>Nomi</th>
              <th>Razmer</th>
              <th>Narx</th>
              <th>Kelishi</th>
              <th>Itogo</th>
              <th>Foyda</th>
              <th>Sana</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((s) => {
              const brand = brands.find((b) => b.id === s.brandId);
              const product = productsMap[s.productId];

              return (
                <tr key={s.id}>
                  <td>{brand?.brandName}</td>
                  <td>{s.productName}</td>
                  <td>
                    {s.soldSizes?.map((sz) => (
                      <div key={sz.size}>
                        {sz.size} — {sz.sold}
                      </div>
                    ))}
                  </td>
                  <td>{s.sellPrice}</td>
                  <td>{product?.comingPrice}</td>
                  <td>{s.soldItogo}</td>
                  <td>{getProfit(s)}</td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistica;
