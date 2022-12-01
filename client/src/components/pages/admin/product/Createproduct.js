import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import MenubarAdmin from "../../../layout/MenubarAdmin";
import { createProduct } from "../../../functions/product";
import { listCategory } from "../../../functions/category";
import FileUpload from "./FileUpload";
import { Spin } from 'antd';

const initialstate = {
  title: "",
  description: "",
  categories: [],
  category: "",
  price: "",
  quantity: "",
  images: [],
};

const CreateProduct = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState(initialstate);
  const [loading, setLoading] = useState(false) 
  const [remove, setRemove] = useState(false) 

  useEffect(() => {
    loadDataCategory(user.token);
  },[]);

  const loadDataCategory = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        //console.log(res.data)
        setValues({ ...values, categories: res.data });
       
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  //console.log(values.category)
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(user.token, values)
      .then((res) => {
        toast.success("Created Successfully", {
          theme: "colored",
        });
        window.location.reload();
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
         {loading
         ?  <h3><Spin /> ກຳລັງໂຫຼດ...</h3>
        : <h3>ເພີ່ມສີນຄ້າ</h3>  
        }
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
                    className="form-select"
                    onChange={handleChange}
                  >
                    <option selected disabled>
                      --ເລືອກປະເພດ--
                    </option>
                    {values.categories.length > 0 &&
                      values.categories.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>

                 <FileUpload loading={loading} remove={remove} setRemove={setRemove} setLoading={setLoading} values={values} setValues={setValues}/>

                <button type="submit" disabled={loading ? true : false} className="btn btn-success">
                  ເພີ່ມ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
