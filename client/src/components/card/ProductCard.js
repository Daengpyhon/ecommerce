import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
const { Meta } = Card;
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { _id, title, description, images, price } = product;

  const handleAddToCard = () => {
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    cart.push({
      ...product,
      count: 1,
    });

    let unique = _.uniqWith(cart, _.isEqual);

    localStorage.setItem("cart", JSON.stringify(unique));

    dispatch({
      type: "ADD_TO_CART",
      payload: unique,
    });

    dispatch({
      type: "SET_VISIBLE",
      payload: true,
    });
  };

  return (
    <div>
      <Card
        hoverable
        cover={
          <img
            alt=""
            style={{ height: "150px", objectFit: "cover" }}
            src={images && images.length ? images[0].url : ""}
          />
        }
        actions={[
          <Link to={`/product/${_id}`}>
            <EyeOutlined key="edit" className="text-primary" />
          </Link>,
          <ShoppingCartOutlined
            onClick={handleAddToCard}
            className="text-danger"
          />,
        ]}
      >
        <p className="text-center">{new Intl.NumberFormat().format(price)} ບາດ</p>
        <Meta title={title} />
      </Card>
    </div>
  );
};

export default ProductCard;
