import React from "react";
import {Link} from 'react-router-dom'
const MenubarUser = () => {
  return (
    <div>
      <ul className="list-group list-group-flush">
      <li className="list-group-item fs-5"><Link to="/user/history" className="text-decoration-none">ປະຫັວດການສັ່ງຊື້</Link></li>
        <li className="list-group-item fs-5"><Link to="/user/wishlist" className="text-decoration-none">ສີນຄ້າທີ່ສົນໃຈ</Link></li>
        
      </ul>
    </div>
  );
};

export default MenubarUser;
