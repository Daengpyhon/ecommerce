import React, {useState, useEffect} from 'react'
import NewProduct from '../home/NewProduct'
import BestSeller from '../home/BestSeller'
//Functions

const Home = () => {
  
  return (
    <div className="container">
     {/* New product */}
     <h5 className="text-center">ສີນຄ້າໃໝ່</h5>
      <NewProduct/>
      <hr />
     {/* The best seller */}
     <h5 className="text-center my-3">ສີນຄ້າຂາຍດີ</h5>
     <BestSeller/>
    </div>
  )
}

export default Home
