import React, {useState, useEffect} from "react";
import MenubarAdmin from "../../../layout/MenubarAdmin";
//Functions
import {readCategory, editCategory} from '../../../functions/category'
import { useParams, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

import{useSelector} from 'react-redux'

const UpdateCategory = () => {

  const {user} = useSelector((state)=>({...state}))

  const navigate = useNavigate();
  const {id} = useParams();

  const [name, setName] = useState();

  useEffect(()=>{
    loadData(user.token,id)
  },[])
   const loadData =(authtoken,id)=>{
    
     readCategory(authtoken,id).then((res)=>{
      setName(res.data.name)
     }).catch((err)=>{
      console.log(err)
     })
   }

  const handleSubmit = (e)=>{
      e.preventDefault();
      editCategory(user.token, id, {name}).then((res)=>{
        toast.success(res.data, {
          theme: 'colored'
        })
        navigate('/admin/create-category')
      }).catch((err)=>{
        toast.error(err.response)
      })

  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 md-2 col-lg-2">
          <MenubarAdmin />
        </div>
        <div className="col-sm-10 md-10 col-lg-10"> 
          <div className="row justify-content-center">         
            <div className="col-sm-12 col-md-6">
            <h3>ອັບເດັດໝວດໝູ່ສີນຄ້າ</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="">ຊື່ໝວດໝູ່</label>
                <input type="text" className="form-control" name="name" value={name} autoFocus required onChange={(e)=>setName(e.target.value)}/>
                
              </div>
              <button type="submit" className="btn btn-success mt-2">ອັບເດັດ</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
