import React, { useState, useEffect } from "react";
import { getUserCart, saveAddress, saveOrder, emptyCart } from "../functions/users";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CheckOut = () => {
  const navigate  =useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("")
  const [addressSaved, setAddressSaved] = useState(false)

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
       // console.log(res.data);
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSaveAddress =()=>{
    console.log(address)
    saveAddress(user.token, address).then((res)=>{
      console.log(res.data)
      if(res.data.ok){
        toast.success("Saved address success", {theme:"colored"})
        setAddressSaved(true);
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  //! Create a order
  const handleCreateOrder = ()=>{
    saveOrder(user.token).then((res)=>{
     console.log(res.data)
     //clear db
     emptyCart(user.token)
     toast.success("Saved order success")
     // clear store
     dispatch({
        type : "ADD_TO_CART",
        payload : []
     })
     // Clear in localStage
     if(typeof window !== 'undefined'){
        localStorage.removeItem('cart');
     }

     navigate("/user/history")

    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h4>ທີ່ຢູ່</h4>
          <hr />
          <ReactQuill value={address} onChange={setAddress}/>
          <button className="btn btn-success mt-3" onClick={handleSaveAddress}>ບັນທືກ</button>
          <p className="fw-bold">ກະລຸນາໃສ່ທີ່ຢູ່ ເຊັນ ສະຖານທິ່ຈັດສົ່ງ ບ້ານ ເມືອງ ແຂວງ ຫລື ບໍລິສັດຂົນສົ່ງ </p>
        </div>
        <div className="col-sm-12 col-md-6">
          <h4 className="text-center">ລາຍລະອຽດການສັ່ງສີນຄ້າ</h4>
          <hr />
          <ul className="list-group">
            {products.map((item, i) => (
              <li className="list-group-item" key={i}>
              {i+1} :  {item.product.title} : <span className="text-primary fw-bold">{new Intl.NumberFormat().format(item.price)} x {item.count} ={" "}
                {new Intl.NumberFormat().format(item.count * item.price) }</span>
              </li>
            ))}
          </ul>    
          <h5 className="mt-3">ລາຄາລວມ : <span className="fw-bold">{ new Intl.NumberFormat().format(total)}</span> ບາດ</h5>
          <button disabled={!addressSaved || !products.length} className="btn btn-success mt-3" onClick={handleCreateOrder}>ຊຳລະສີນຄ້າ</button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
