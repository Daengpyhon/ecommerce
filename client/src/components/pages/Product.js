import React, { useState, useEffect } from "react";
import { readProduct } from "../functions/product";
import { useParams } from "react-router-dom";
import SingleProductCard from "../card/SingleProductCard";
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(id)
      .then((res) => {
        //  console.log(res.data)
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <SingleProductCard product={product}/>
      </div>
     
    </div>
  );
};

export default Product;
