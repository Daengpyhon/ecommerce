import React, { useState, useEffect } from "react";
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import MenubarAdmin from "../../../layout/MenubarAdmin";
import {
  createCategory,
  listCategory,
  deleteCategory,
} from "../../../functions/category";

import{useSelector} from 'react-redux'

const CreateCategory = () => {

  const {user} = useSelector((state)=>({...state}))

  const [values, setValues] = useState({
    name: "",
  });
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadData(user.token);
  }, [user.token]);

  const loadData = (authtoken) => {
    listCategory(authtoken)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleDelete = (id) => {
    deleteCategory(user.token,id)
      .then((res) => {
        toast.success(res.data, {
          theme : 'colored'
        })
        // console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const handleChangeCategory = (e) => {
   // console.log(values.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(values);
    createCategory(user.token,values)
      .then((res) => {
        toast.success("Created Success", {
          theme :'colored'
        });
        loadData(user.token);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 md-2 col-lg-2">
          <MenubarAdmin />
        </div>
        <div className="col-sm-10 md-10 col-lg-10">
          <div className="row">
            <div className="col-sm-12 col-md-4 col-lg-4">
              <h4>ສ້າງໝວດໝູ່ສີນຄ້າ</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                 
                  <input
                    type="text"
                    name="name"
                    value={values.name}
                    className="form-control"
                    onChange={handleChangeCategory}
                  />
                </div>
                <button type="submit" className="btn btn-success mt-3">
                  ເພີ່ມ
                </button>
              </form>
            </div>
            <div className="col-sm-12 col-md-8 col-lg-8">
              <h4>ລາຍການໝວດໝູ່ສີນຄ້າ</h4>
              <hr />
              <ol className="list-group list-group-numbered">
                {category.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-start"
                    key={item._id}
                  >
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{item.name}</div>
                    </div>

                   <Link to={`/admin/update-category/${item._id}`}>
                   <span className="badge bg-primary rounded-pill mx-2" style={{cursor:'pointer'}}>Edit</span>
                   </Link>

                    <span className="badge bg-danger rounded-pill mx-2" onClick={()=>handleDelete(item._id)} style={{cursor:'pointer'}}>X</span>
               
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
