import React, { useEffect, useState } from "react";
import MenubarUser from "../../layout/MenubarUser";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {Link} from "react-router-dom"
import { getWishlist, removeWishList } from "../../functions/users";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getWishlist(user.token)
      .then((res) => {
        // console.log(res.data.wishlist);
        setWishlist(res.data.wishlist);
      })
      .catch((err) => {
        console(err.response);
      });
  };

  //! Remove
  const handleRemove = (productId) => {
    removeWishList(user.token, productId)
      .then((res) => {
        console.log(res.data);
        loadData();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 md-2 col-lg-2">
          <MenubarUser />
        </div>
        <div className="col-sm-10 md-10 col-lg-10">
          <div className="row">
            <h4>ສີນຄ້າທີ່ໜ້າສົນໃຈ</h4>
            <hr />
            {wishlist.length < 1 ? <div className="alert alert-warning text-center fw-bold">ທ່ານບໍ່ໄດ້ສົນໃຈສີນຄ້າໃດໆ</div> : ""}
            {wishlist.length > 0  &&
              <ol className="list-group list-group-numbered">
                {wishlist.map((item, index) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-start"
                    key={index}
                  >
                    <div className="ms-2 me-auto">
                      <Link to={"/product/"+item._id} className="fw-bold">{item.title}</Link>
                    </div>
                    <span
                      onClick={() => handleRemove(item._id)}
                      className="badge bg-danger rounded-pill"
                      style={{ cursor: "pointer" }}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ol>
            
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
