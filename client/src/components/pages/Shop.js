import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../card/ProductCard";
//! import function
import { listProducts, searchFilters } from "../functions/product";
import { listCategory } from "../functions/category";

//Ant design
import { Slider, Checkbox } from "antd";
const Shop = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const { search } = useSelector((state) => ({ ...state }));

  //Category State
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);

  const { text } = search;
  //! 1 Load data all
  useEffect(() => {
    loadData();
    // load category
    listCategory().then((res) => setCategory(res.data));
  }, []);
  // console.log("my category loaded : ", category);
  const loadData = () => {
    setLoading(true);
    listProducts(12)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  };

  //! 2 load data when filter with text
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilters({ query: text });

      if (!text) {
        loadData();
      }
    }, 100);

    return () => clearTimeout(delay);
  }, [text]);

  //! Filters text
  const fetchDataFilters = (arg) => {
    searchFilters(arg)
      .then((res) => {
        setProduct(res.data);
       // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //!3 load data on slider
  useEffect(() => {
    fetchDataFilters({ price });
  }, [ok]);

  const handlePrice = (value) => {
    setPrice(value);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // ! Change Checkbok for filters 
  const handleCheck = (e)=>{
   // console.log('Checkbok id : ', e.target.value);
   // This is current value in the checkbox
   let inCheck = e.target.value
   // This is old value in the checkbox
   let inState = [...categorySelect]

   let findCheck = inState.indexOf(inCheck)

   if(findCheck === -1){
       inState.push(inCheck)
   }else{
    inState.splice(findCheck, 1)
   }

   setCategorySelect(inState)
   console.log(inState)
   fetchDataFilters({ category : inState });

   if(inState.length < 1){
    loadData()
   }

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          <h6>ຄົ້ນຫາດ້ວຍລາຄາ</h6>
          <hr />
          <Slider onChange={handlePrice} range value={price} max={100000} />
          <hr />
          <h6>ຄົ້ນຫາດ້ວຍໝວດໝູ່</h6>

          {category.map((item, index) => (
            <Checkbox value={item._id} key={index} onChange={handleCheck}>
              {item.name}
              </Checkbox>
          ))}
        </div>

        <div className="col-md-10">
          {loading ? <h4>ກຳລັງໂຫລດ...</h4> : <h4>ສີນຄ້າທັງໝົດ</h4>}
          {product.length < 1 && (
            <p className="text-center text-warning fs-5">ບໍ່ພົບສີນຄ້າ</p>
          )}

          <div className="row">
            {product.map((item, index) => (
              <div key={index} className="col-md-4 my-2">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
