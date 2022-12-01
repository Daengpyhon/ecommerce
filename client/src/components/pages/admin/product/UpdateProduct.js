import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { readCategory } from "../../../functions/category";
import FileUpload from "./FileUpload";
// function
import { readProduct, updateProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";
const UpdateProduct = () => {
  const initialstate = {
    title: "",
    description: "",
    categories: [],
    category: "",
    price: "",
    quantity: "",
    images: [],
  };

  const { id } = useParams();
  console.log("ID : ", id);
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialstate);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    readProduct(id)
      .then((res) => {
        setValues({ ...values, ...res.data });
      })
      .catch((err) => {
        console.log(err.response);
      });

    listCategory(user.token)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //console.log('Products : ', values)
  // console.log('Categories : ', category)

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateProduct(user.token, values._id, values)
      .then((res) => {
        toast.success(`Updated ${res.data.title} Successfully`, {
          theme: "colored",
        });
        setLoading(true);
        setTimeout(() => {
          navigate("/admin/index");
        }, 1000);
      })
      .catch((err) => {
        toast.error("Update Error");
        console.log(err);
        setLoading(false);
      });
  };

 

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 md-2 col-lg-2">
          <MenubarAdmin />
        </div>
        <div className="col-sm-10 md-10 col-lg-10">
          {loading ? <h3>ກຳລັງໂຫລດ...</h3> : <h3>ອັບເດັດສີນຄ້າ</h3>}
          <hr />
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="form-group my-2">
                  <label htmlFor="">ຊື່ສີນຄ້າ</label>
                  <input
                    type="text"
                    name="title"
                    value={values.title}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group my-2">
                  <label htmlFor="">ລາຍລະອຽດ</label>
                  <input
                    type="text"
                    name="description"
                    value={values.description}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group my-2">
                  <label htmlFor="">ລາຄາ</label>
                  <input
                    type="number"
                    name="price"
                    value={values.price}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group my-2">
                  <label htmlFor="">ຈຳນວນ</label>
                  <input
                    type="number"
                    name="quantity"
                    value={values.quantity}
                    className="form-control"
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group my-2">
                  <label htmlFor="">ໝວດໝູ່</label>
                  <select
                    name="category"
                    className="form-select form-select-sm mb-3"
                    onChange={handleChange}
                  >
                   <option selected disabled className="fw-bolder">ເລືອກປະເພດສີນຄ້າ</option>

                    {category.length > 0 &&
                      category.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                <FileUpload
                  loading={loading}
                  remove={remove}
                  setRemove={setRemove}
                  setLoading={setLoading}
                  values={values}
                  setValues={setValues}
                />

                <button type="submit" className="btn btn-success">
                  ອັບເດັດ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
