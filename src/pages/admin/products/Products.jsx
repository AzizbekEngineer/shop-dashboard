import React from "react";
import { useGetProductsQuery } from "../../../context/api/productsApi";

const Products = () => {
  const { data } = useGetProductsQuery();
  console.log(data);

  return <div>Products</div>;
};

export default Products;
