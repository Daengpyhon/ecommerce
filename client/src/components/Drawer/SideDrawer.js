import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Drawer } from "antd";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));
  const onCloseDrawer = () => {
    dispatch({
      type: "SET_VISIBLE",
      payload: false,
    });
  };
  return (
    <>
      <Drawer
        title={`ຈຳນວນສີນຄ້າ ${cart.length}`}
        placement="right"
        onClose={onCloseDrawer}
        visible={drawer}
      >
        {cart.map((item, index) => (
          <div className="row" key={index}>
            <div className="col-sm-12 col-md-6">
              <div className="card my-2 ms-2" style={{ width: "15rem" }}>
                <img
                  src={item.images[0].url}
                  style={{ width: "100%" }}
                  className="card-img-top rounded"
                />
                <div className="card-body">
                  <h6 className="card-title">{item.title}</h6>
                  <p>
                    ຈຳນວນ {item.count} ລາຄາ {item.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <Link to="/cart">
          <button onClick={onCloseDrawer} className="btn btn-primary text-center">ໄປທີ່ຕະກ້າ</button>
        </Link>
      </Drawer>
    </>
  );
};

export default SideDrawer;
