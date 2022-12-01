import React from "react";
import MenubarUser from "../../layout/MenubarUser";
const Home = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-2 md-2 col-lg-2">
          <MenubarUser />
        </div>
        <div className="col-sm-10 md-10 col-lg-10">
          <div className="row">
            <h3>Home User</h3>
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
