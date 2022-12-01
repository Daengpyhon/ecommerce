import React from "react";
import {Link} from 'react-router-dom'
const MenubarAdmin = () => {
  return (
    <div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item fs-5"><Link to="/admin/index" className="text-decoration-none">ແດສບອດ</Link></li>

        <li className="list-group-item fs-5"><Link to="/admin/manage-admin" className="text-decoration-none">ຈັດການແອັດມີນ</Link></li>  

        <li className="list-group-item fs-5"><Link to="/admin/create-category" className="text-decoration-none">ເພີ່ມໝວດໝູ່</Link></li>    

        <li className="list-group-item fs-5"><Link to="/admin/create-product" className="text-decoration-none">ເພີ່ມສີນຄ້າ</Link></li>    
        <li className="list-group-item fs-5"><Link to="/admin/orders" className="text-decoration-none">ຈັດການອໍເດີ</Link></li>    

      </ul>
    </div>
  );
};

export default MenubarAdmin;
