import React from "react";
import { Card, Tabs } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { addToWishList } from "../functions/users";
import { toast } from "react-toastify";
const SingleProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  const { _id, title, description, images, price, sold, quantity, category } =
    product;
  //console.log(product);

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

  //! add to wislist
  const handleAddToWishList = (e)=>{
   console.log(_id)
   if(user){
    addToWishList(user.token,_id).then((res)=>{
      console.log(res.data)
      toast.success("ເພີ່ມສີນຄ້າທີ່ສົນໃຈແລ້ວ", {theme:"colored"})
     }).catch((err)=>{
      console.log(err.response)
     })
   }else{
    toast.error("ກະລຸນາລ໋ອກອີນ!!", {theme:"colored"})
    return
   }
  
  }

  return (
    <>
      <div className="col-md-7">
        <Carousel autoPlay showArrows={true} infiniteLoop>
          {images &&
            images.map((item, i) => (
              <img key={item.public_id} src={item.url} />
            ))}
        </Carousel>
      </div>
      <div className="col-md-5">
        <h4 className="text-center">{title}</h4>
        <Card
          actions={[
            <a onClick={handleAddToWishList}>
              <HeartOutlined key="edit" className="text-info" />
              <br />
              ສີ່ງທີ່ຢາກໄດ້
            </a>,
            <>
              <a onClick={handleAddToCard}>
                <ShoppingCartOutlined className="text-danger" />
                <br />
                ເພີ່ມລົງຕະກ້າ
              </a>
            </>,
          ]}
        >
          <ul className="list-group">
            <li className="list-group-item">
              ລາຄາ : <span className="float-end">{new Intl.NumberFormat().format(price)} ບາດ</span>
            </li>
            <li className="list-group-item">
              ຈຳນວນ : <span className="float-end">{quantity}</span>
            </li>
            <li className="list-group-item">
              ຍອດຂາຍ : <span className="float-end">{sold}</span>
            </li>
            {category && (
              <li className="list-group-item">
                ໝວດໝູ່ : <span className="float-end">{category.name}</span>
              </li>
            )}
          </ul>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="ລາຍລະອຽດ" key="1">
              {description}
            </Tabs.TabPane>
            <Tabs.TabPane tab="ເພີ່ມເຕີມ" key="2">
              Content of Tab Pane 2
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </div>
    </>
  );
};

export default SingleProductCard;
