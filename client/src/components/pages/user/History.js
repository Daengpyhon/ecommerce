import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MenubarUser from "../../layout/MenubarUser";
import { getOrders } from "../../functions/users";
//! React PDF
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

import Invoice from "../../order/Invoice";
import InvoicejsPDF from "../../order/InvoicejsPDF";

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getOrders(user.token)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
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
            <h5>ປະຫັວດການສັ່ງຊື້</h5>
            <hr />
            {orders.length <1 ? <div className="alert alert-warning fw-bold text-center">ບໍ່ມີປະຫັວດການຊື້ສີນຄ້າ!!</div> : ""}
            
            {/* Loop order card */}
            {orders.map((item, index) => {
              return (
                <div className="card m-2" key={index}>
                  <p>ສະຖານະ {"  " + item.orderstatus}</p>
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
                          ຜົນລວມ
                        </td>
                        <td className="fw-bold">
                          {new Intl.NumberFormat().format(item.cartTotal)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* PDF file with download */}
                  <div className="row ">
                    <div className="col-6">
                      <PDFDownloadLink
                        document={<Invoice order={item} />}
                        fileName="invoice.pdf"
                        className="btn btn-primary btn-sm my-2"
                      >
                        PDF Download
                      </PDFDownloadLink>
                    </div>
                    <div className="col-6">
                      <InvoicejsPDF order={item}/>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
