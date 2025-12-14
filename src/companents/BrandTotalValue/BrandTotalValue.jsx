import { useGetProductsQuery } from "../../context/api/productsApi";
import "./BrandTotalValue.scss";

const BrandTotalValue = ({ brend }) => {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) return null;

  const filterProducts =
    products.filter((p) => p.category?.id == brend.id) || [];
  // console.log(filterProducts);

  const allCounts = filterProducts.reduce(
    (acc, item) => acc + (item.count || 0),
    0
  );
  const allSums = filterProducts.reduce(
    (acc, item) => acc + (item.itogo || 0),
    0
  );

  return (
    <div className="brandTotalValue">
      <p>{allCounts} ta</p>
      <p>{allSums} $</p>
    </div>
  );
};

export default BrandTotalValue;
