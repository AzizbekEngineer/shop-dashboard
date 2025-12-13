import { useGetProductsQuery } from "../../../context/api/productsApi";
import "./products.scss"

const Products = () => {
  const { data: products, isLoading } = useGetProductsQuery();
  if (isLoading) return null
  console.log(products);

  return <div className="product-cards">
    {products && products.map((product) => (
      <div className="product-cards-card">
        <h3>{product.name}:</h3>
        <p>rangi: <br />  {product.rang}</p>
        <p>soni: <br /> {product.count}</p>
        <p>narxi: <br /> {product.price}$</p>
        <p>itogo: <br /> {product.itogo}$</p>
      </div>
    ))}
  </div>;
};

export default Products;
