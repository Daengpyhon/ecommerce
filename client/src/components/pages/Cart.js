import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductTableInCart from "../card/ProductTableInCart";
import {useNavigate} from "react-router-dom"
import {userCart} from "../functions/users"
const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const handleSaveOrder = () => {
    alert('Check Out Order!!!')

   userCart(user.token, cart).then((res)=>{
    console.log(res.data)
    navigate("/checkout")
   }).catch((error)=>{
    console.log(error.response)
   })

   
  };

  const showCartItem = ()=>{
    return (
      <table className="table">
      <thead>
        <tr>
          <th>#</th>
          <th>ລາຍການສີນຄ້າ</th>
          <th>ຮູບພາບ</th>
          <th>ລາຄາ(ບາດ)</th>
          <th>ຈຳນວນ</th>
          <th>ລົບ</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item, index)=>
        <ProductTableInCart key={item._id}  item={item} index={index}/>
        )}
      </tbody>
    </table>
    )
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <h4>ຈຳນວນສີນຄ້າ {cart.length}</h4>
          {!cart.length
          ? <h5 className="text-center text-danger">ບໍ່ມີຂໍ້ມູນສີນຄ້າ !!</h5>
          : showCartItem()
          }
        </div>
        <div className="col-sm-12 col-md-4">
          <h4>ລາຍລະອຽດ</h4>
          <hr />
          {cart.map((item, index) => (
            <p key={index}>
             {index +1}. {item.title} &nbsp;:&nbsp;&nbsp; 
              <span className="text-primary fw-bold">
                {new Intl.NumberFormat().format(item.price)} x {item.count} = {new Intl.NumberFormat().format(item.price * item.count)}
              </span>
            </p>
          ))}
          <hr />
          <h5>ລາຄາລວມ : {new Intl.NumberFormat().format(getTotal())} ບາດ</h5>
          <hr />
          {user ? (
            <button
              className="btn btn-success"
              onClick={handleSaveOrder}
              hidden={!cart.length}
            >
              ສັ່ງຊື້
            </button>
          ) : (
            <Link to="/login" state="cart"><button className="btn btn-danger text-white"  hidden={!cart.length}>
             ລ໋ອກອີນເພື່ອສັ່ງຊື້
            </button>
            </Link>
          )}
          <Link to="/shop" className="mx-3">
            <button className="btn btn-primary">ເລື່ອກສີນຄ້າເພີ່ມເຕີ່ມ</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
