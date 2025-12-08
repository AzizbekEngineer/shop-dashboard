import React from "react";
import "./brands.scss";
import { useGetBrandsQuery } from "../../../context/api/brandsApi";

const Brands = () => {
  const { data } = useGetBrandsQuery();
  console.log(data);

  return (
    <div className="brand">
      <div className="brand__top">
        <h2>Bandlar</h2>
        <button>Brand yaratish</button>
      </div>
      <div className="brand__cards"></div>
    </div>
  );
};

export default Brands;
