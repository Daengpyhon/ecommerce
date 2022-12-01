import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DeleteOutlined } from "@ant-design/icons";
const ProductTableInCart = ({ item, index }) => {
  const dispatach = useDispatch();

  const handleChangeCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;

    if (count > item.quantity) {
      toast.error(
        `ບໍ່ສາມາດເພີ່ມຈຳນວນໄດ້ອີກ ຈຳນວນຄ້ານີ່ມີພຽງ ${item.quantity}`,
        { theme: "colored" }
      );
      return;
    }

    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    //console.log(cart)

    cart.map((product, i) => {
      if (product._id === item._id) {
        cart[i].count = count;
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatach({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };
  //! Remove item to cart
  const handleRemove = () => {
    let cart = [];

    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    //console.log(cart)

    cart.map((product, i) => {
      if (product._id === item._id) {
        cart.splice(i, 1)
      }
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    dispatach({
      type: "ADD_TO_CART",
      payload: cart,
    });
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <img width="50" src={item.images[0].url} />
      </td>
      <td>{item.title}</td>
      <td>{new Intl.NumberFormat().format(item.price)}</td>
      <td>
        <input
          type="number"
          value={item.count}
          className="form-control form-control-sm"
          onChange={handleChangeCount}
          min={1}
        />
      </td>

      <td>
        <button className="btn btn-danger btn-sm" onClick={handleRemove}>
          <DeleteOutlined />
        </button>
      </td>
    </tr>
  );
};

export default ProductTableInCart;
