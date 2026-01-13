// import "./Statistica.scss";
// import { useGetBrandsQuery } from "../../../context/api/brandsApi";
// import {
//   useCreateProductMutation,
//   useGetProductsQuery,
//   useGetSalesQuery,
// } from "../../../context/api/productsApi";

// const Statistica = () => {
//   const { data: soldProducts, isLoading } = useGetSalesQuery();
//   const { data: products } = useGetProductsQuery();
//   const { data: soldBrandData } = useGetBrandsQuery();
//   if (isLoading) return null;

//   const productsMap = products?.reduce((acc, p) => {
//     acc[p.id] = p;
//     return acc;
//   }, {});

//   const getProfit = (sale) => {
//     const product = productsMap?.[sale.productId];
//     if (!product) return 0;

//     return sale.soldItogo - sale.totalSold * product.comingPrice;
//   };

//   return (
//     <div className="statistica">
//       <table className="statisticaTable">
//         <caption>
//           statistica
//         </caption>
//         <thead>
//           <tr>
//             <th>brendi</th>
//             <th>nomi</th>
//             <th>razmeri</th>
//             <th>narxi</th>
//             <th>kelishi</th>
//             <th>itogo</th>
//             <th>foyda</th>
//             <th>sana</th>
//           </tr>
//         </thead>
//         <tbody>
//           {soldProducts.map((sP) => {
//             const brand = soldBrandData?.find((b) => b.id === sP.brandId);
//             const comingP = products?.find((cP) => cP.id === sP.productId);

//             return (
//               <tr key={sP.id}>
//                 <td data-cell="brendi">{brand?.brandName}</td>
//                 <td data-cell="nomi">{sP.productName}</td>
//                 <td data-cell="razmeri">
//                   {sP.soldSizes.map((s) => (
//                     <div key={s.size}>
//                       {s.size}-{s.sold}
//                     </div>
//                   ))}
//                 </td>
//                 <td data-cell="narxi">{sP.sellPrice}</td>
//                 <td data-cell="kelishi">{comingP?.comingPrice}</td>
//                 <td data-cell="itogo">{sP.soldItogo}</td>
//                 <td data-cell="foyda"> {getProfit(sP)}</td>
//                 <td data-cell="sana">{new Date(sP.createdAt).toLocaleString()}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Statistica;
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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
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
      const saleDate = new Date(s.createdAt);
      const profit = getProfit(s);
      const productName = (s.productName || "").toLowerCase();

      if (brandId && s.brandId !== brandId) return false;
      if (search && !productName.includes(search.toLowerCase())) return false;

      if (minPrice && s.sellPrice < +minPrice) return false;
      if (maxPrice && s.sellPrice > +maxPrice) return false;

      if (minProfit && profit < +minProfit) return false;
      if (maxProfit && profit > +maxProfit) return false;

      if (fromDate && saleDate < new Date(fromDate)) return false;
      if (toDate && saleDate > new Date(toDate)) return false;

      return true;
    });
  }, [
    soldProducts,
    brandId,
    search,
    minPrice,
    maxPrice,
    minProfit,
    maxProfit,
    fromDate,
    toDate,
    productsMap,
  ]);

  // RESET
  const resetFilters = () => {
    setBrandId("");
    setSearch("");
    setFromDate("");
    setToDate("");
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

        <input
          type="number"
          placeholder="Min narx"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max narx"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Min foyda"
          value={minProfit}
          onChange={(e) => setMinProfit(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max foyda"
          value={maxProfit}
          onChange={(e) => setMaxProfit(e.target.value)}
        />

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
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
          <caption>
              statistica
            </caption>
          <thead>
            
            <tr>
              <th>Brend</th>
              <th>Nomi</th>
              <th>Razmer</th>
              <th>Kelishi</th>
              <th>Sotilishi</th>
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
                        {sz.size} - {sz.sold}
                      </div>
                    ))}
                  </td>
                  <td>{product?.comingPrice}</td>
                  <td>{s.sellPrice}</td>
                  <td>{s.soldItogo}</td>
                  <td>{getProfit(s)}</td>
                  <td>{new Date(s.createdAt).toLocaleString()}</td>
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
