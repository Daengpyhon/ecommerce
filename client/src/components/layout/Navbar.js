import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCartOutlined, ShoppingOutlined, HomeOutlined  } from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import Search from "../card/Search";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));
  // console.log("user navbar : ", user)
  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center  justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <h3 className="fw-bold">I-DEV</h3>
        </Link>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/" className="nav-link px-2 link-secondary fs-6 fw-bold">
            <HomeOutlined/> ໜ້າຫຼັກ
            </Link>
          </li>
          <li>
            <Link to="/shop" className="nav-link px-2 link-white fs-6 fw-bold">
              <ShoppingOutlined className="fs-5" />
              ຊ໋ອບ
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link px-2 link-white fs-6 fw-bold">
              <ShoppingCartOutlined className="fs-5" />
              <Badge count={cart.length} offset={[9, 0]}>
                ຕະກ້າ
              </Badge>
            </Link>
          </li>
        </ul>
        <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <Search />
        </div>
        <div className="col-md-3 text-end">
          {user && (
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  {user.role === "admin" ? (
                    <Link
                      to="/admin/index"
                      className="dropdown-item text-primary"
                    >
                      ແດສບອດ
                    </Link>
                  ) : (
                    <Link
                      to="/user/index"
                      className="dropdown-item text-primary"
                    >
                      ແດສບອດ
                    </Link>
                  )}

                  <a className="dropdown-item text-danger" onClick={logout}>
                    ອອກຈາກລະບົບ
                  </a>
                </li>
              </ul>
            </div>
          )}

          {!user && (
            <>
              <Link to="/login">
                <button type="button" className="btn btn-outline-primary me-2">
                  ລ໋ອກອີນ
                </button>
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
