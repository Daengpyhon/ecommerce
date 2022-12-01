import React, { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
import { listProductBy } from "../functions/product";
import LoadingCard from "../card/LoadingCard";

const BestSeller = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listProductBy("sold", "desc", 4)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div>
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        <div className="row">
          {products.map((product, index) => (
            <div className="col-sm-12 col-md-4 col-lg-3" key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BestSeller;
