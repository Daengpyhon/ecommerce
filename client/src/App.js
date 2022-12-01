import React from "react";
import { Routes, Route } from "react-router-dom";
//!Pages
import Register from "./components/pages/auth/Register";
import Login from "./components/pages/auth/Login";
import Home from "./components/pages/Home";
import Navbar from "./components/layout/Navbar";
//!14 product detail
import Product from "./components/pages/Product";
//! 15 shop
import Shop from "./components/pages/Shop"
//! 16 Prodct Cart
import Cart from "./components/pages/Cart";
//! 17 Drawer
import SideDrawer from "./components/Drawer/SideDrawer";
//! 18 Checkout
import CheckOut from "./components/pages/CheckOut";
//!Pages Admin (2)
import HomeAdmin from "./components/pages/admin/Home";
//! import create categories (10)
import CreateCategory from "./components/pages/admin/category/CreateCategory";
//! 11
import UpdateCategory from './components/pages/admin/category/UpdateCategory'
//!12 
import CreateProduct from "./components/pages/admin/product/Createproduct";
//!13 
import UpdateProduct from './components/pages/admin/product/UpdateProduct'
//!9
import ManageAdmin from "./components/pages/admin/ManageAdmin";
// ! 21 Orders
import Orders from "./components/pages/admin/Orders"
//!Pages User
import HomeUser from "./components/pages/user/Home";
//! 19 Wishlist
import Wishlist from "./components/pages/user/Wishlist";
//! 20 History
import History from "./components/pages/user/History"

//!import currentUser from  functions folder (3)
import { currentUser } from "./components/functions/auth";
//! Redux  (4)
import { useDispatch } from "react-redux";

//! Route (7)
import UserRoute from "./components/routes/UserRoute";
//! 8
import AdminRoute from "./components/routes/AdminRoute";
import Noroute from "./Noroute";

function App() {
  const dispatch = useDispatch();
  // 5
  const idtoken = localStorage.token;
  // So let make auth file in the function components
  if (idtoken) {
    //console.log("Id token : ",idtoken)
    // Send token to backend
    // 6
    currentUser(idtoken)
      .then((res) => {
        //console.log(res.data);

        // update state on reducer
        // store idtoken, username, role on localstorage
        // Fetch these data from localstorage to state redux
        //when you refresh it's not clear state
        dispatch({
          type: "LOGIN",
          payload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
           console.log(err.response.data)
      });
  }

  return (
    <div>
      <Navbar />
      <SideDrawer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        //! product detail
        <Route path="/product/:id" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />

        {/* 8 */}

        <Route
          path="/admin/index"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />

        {/* Manage Admin (9) */}
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />
        {/* Create Category 10*/}
        <Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <CreateCategory />
            </AdminRoute>
          }
        />

        {/* Update Categories 11*/}

        <Route
          path="/admin/update-category/:id"
          element={
            <AdminRoute>
              <UpdateCategory />
            </AdminRoute>
          }
        />
        {/* Create Product */}

        <Route
          path="/admin/create-product"
          element={
            <AdminRoute>
              <CreateProduct />
            </AdminRoute>
          }
        />
        {/* Create Update */}

        <Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <UpdateProduct />
            </AdminRoute>
          }
        />
        {/* Order */}

        <Route
          path="/admin/orders"
          element={
            <AdminRoute>
              <Orders />
            </AdminRoute>
          }
        />



        {/* 7 User page*/}
        <Route
          path="/user/index"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />


        {/* 7 User page*/}
        <Route
          path="/checkout"
          element={
            <UserRoute>
              <CheckOut/>
            </UserRoute>
          }
        />

        {/* 19 Wishlist page*/}
        <Route
          path="/user/wishlist"
          element={
            <UserRoute>
              <Wishlist/>
            </UserRoute>
          }
        />
        {/* 20 History Page */}
        <Route
          path="/user/history"
          element={
            <UserRoute>
              <History/>
            </UserRoute>
          }
        />

        {/* No Route */}
        <Route
          path="*"
          element={
            <UserRoute>
              <Noroute/>
            </UserRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
