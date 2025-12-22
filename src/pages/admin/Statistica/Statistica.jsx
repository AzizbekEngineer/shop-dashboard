import "./Statistica.scss";
import { useGetBrandsQuery } from "../../../context/api/brandsApi";
import {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetSalesQuery,
} from "../../../context/api/productsApi";

const Statistica = () => {
  const { data: soldProducts, isLoading } = useGetSalesQuery();
  const { data: products } = useGetProductsQuery();
  const { data: soldBrandData } = useGetBrandsQuery();
  if (isLoading) return null;
  

  const productsMap = products?.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {});

  const getProfit = (sale) => {
    const product = productsMap?.[sale.productId];
    if (!product) return 0;

    return sale.soldItogo - sale.totalSold * product.comingPrice;
  };

  return (
    <div className="statistica">
      <table className="statisticaTable">
        <caption>
          statistica
        </caption>
        <thead>
          <tr>
            <th>brendi</th>
            <th>nomi</th>
            <th>razmeri</th>
            <th>narxi</th>
            <th>kelishi</th>
            <th>itogo</th>
            <th>foyda</th>
            <th>sana</th>
          </tr>
        </thead>
        <tbody>
          {soldProducts.map((sP) => {
            const brand = soldBrandData?.find((b) => b.id === sP.brandId);
            const comingP = products?.find((cP) => cP.id === sP.productId);

            return (
              <tr key={sP.id}>
                <td data-cell="brendi">{brand?.brandName}</td>
                <td data-cell="nomi">{sP.productName}</td>
                <td data-cell="razmeri">
                  {sP.soldSizes.map((s) => (
                    <div key={s.size}>
                      {s.size}-{s.sold}
                    </div>
                  ))}
                </td>
                <td data-cell="narxi">{sP.sellPrice}</td>
                <td data-cell="kelishi">{comingP?.comingPrice}</td>
                <td data-cell="itogo">{sP.soldItogo}</td>
                <td data-cell="foyda"> {getProfit(sP)}</td>
                <td data-cell="sana">{new Date(sP.createdAt).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Statistica;
