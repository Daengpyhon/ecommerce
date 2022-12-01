import React, { useState, useEffect } from "react";
import moment from "moment/min/moment-with-locales";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
//import { getOrders } from "../../functions/users";
import { updateStatusOrder, getOrdersAdmin } from "../../functions/admin";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrdersAdmin(user.token)
      .then((res) => {
        //console.log(res.data)
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  //console.log(orders);
  const { user } = useSelector((state) => ({ ...state }));

  const handleChangeStatus = (orderId, orderstatus) => {
    // console.log(orderId, orderstatus)
    updateStatusOrder(user.token, orderId, orderstatus)
      .then((res) => {
        console.log(res.data);
        toast.success(
          "Updated order " + res.data.orderstatus + " succesfully",
          { theme: "colored" }
        );
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
          <MenubarAdmin />
        </div>
        <div className="col-sm-10 md-10 col-lg-10">
          {orders.length < 1  ? <h5 className="text-center bg-warning p-2">ບໍ່ມີປະຫວັດການສັ່ງຊື້!!</h5> : "" }
          {orders.map((item, index) => {
            return (
              <div className="card m-2" key={index}>
                <div className="row ">
                  <div className="col-6">
                    <h6 className="m-2">ຊື່{item.orderBy.role === "admin"? "ແອັດມີນ" : "ລູກຄ້າ"} {item.orderBy.username}</h6>
                    <span className="m-2">
                      ເວລາສັ່ງຊື້ :{" "}
                      {moment(item.createdAt)
                        .locale("lo")
                        .format("DD-MM-YYYY, h:mm:ss a")}
                    </span>
                  </div>
                  
                  <div className="col-6">
                    <select
                      value={item.orderstatus}
                      className="form-select form-select-sm mt-3"
                      style={{ width: "200px", alignSelf: "center" }}
                      onChange={(e) =>
                        handleChangeStatus(item._id, e.target.value)
                      }
                    >
                      <option value="Not process">ຍັງບໍ່ດຳເນີນການ</option>
                      <option value="Processing">ກຳລັງດຳເນີນການ</option>
                      <option value="Canelled">ຍົກເລີກແລ້ວ</option>
                      <option value="Completed">ອານຸມັດແລ້ວ</option>
                    </select>
                  </div>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">ຊື່ສີນຄ້າ</th>
                      <th scope="col">ລາຄາ</th>
                      <th scope="col">ຈຳນວນ</th>
                      <th scope="col">ຍອດລວມ</th>
                    </tr>
                  </thead>
                  {/* 2 Loop table */}
                  <tbody>
                    {item.products.map((p, i) => (
                      <tr key={i}>
                        <th scope="row">{i + 1}</th>
                        <td>{p.product.title}</td>
                        <td>{new Intl.NumberFormat().format(p.price)}</td>
                        <td>{p.count}</td>
                        <td>
                          {new Intl.NumberFormat().format(p.count * p.price)}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="text-center fw-bold">
                        ລວມລາຄາ
                      </td>
                      <td className="fw-bold">
                        {new Intl.NumberFormat().format(item.cartTotal)} ບາດ
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Orders;
