import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "antd";
const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  //console.log(product)

  const { _id, title, description, images, price } = product;

  return (
    <div>
      <Card className="my-2"
        hoverable
        cover={
          <img
            alt=""
            style={{ height: "150px", objectFit: "cover" }}
            src={images && images.length ? images[0].url : ""}
          />
        }
        actions={[
          <Link to={`/admin/update-product/${_id}`}>
            <EditOutlined key="edit" className="text-primary" />
          </Link>,
          <DeleteOutlined
            className="text-danger"
            onClick={() => handleRemove(_id)}
          />,
        ]}
      >
        
        <p className="text-center mt-2">{new Intl.NumberFormat().format(price)} ບາດ</p>
        <Meta title={title}/>
      </Card>
    </div>
  );
};

export default AdminProductCard;
