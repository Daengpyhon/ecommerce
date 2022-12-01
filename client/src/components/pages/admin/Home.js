import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { listProducts, removeProduct } from "../../functions/product";
import { removeOrder } from "../../functions/admin";
import AdminProductCard from "../../card/AdminProductCard";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Home = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData(100);
  }, []);

  const loadData = (count) => {
    setLoading(true);
    listProducts(count)
      .then((res) => {
        // console.log(res.data)
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleRemove = (id) => {
    //console.log('Remove id : ',id)
    if (window.confirm("Are you sure you want to remove")) {
      removeProduct(user.token, id)
        .then((res) => {
          toast.success(res.data);
          loadData(100);
        })
        .catch((error) => {
          toast.error(error.response);
          console.log(error);
        });
      // ! Delete order
     
        removeOrder(user.token, id)
          .then((res) => {
            // toast.success(res.data);
            loadData(100);
          })
          .catch((error) => {
            toast.error(error.response);
            console.log(error);
          });
      
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 md-2 col-lg-2">
          <MenubarAdmin />
        </div>
        <div className="col-sm-10 md-10 col-lg-10">
          {loading ? <h3>ກຳລັງໂຫລດ...</h3> : <h3>ໜ້າຫຼັກແອດມີນ</h3>}
          <hr />

          <div className="row">
            {product.map((item) => (
              <div className="col-sm-12 col-md-4 col-lg-3" key={item._id}>
                <AdminProductCard handleRemove={handleRemove} product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
