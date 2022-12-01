import axios from 'axios'

export const updateStatusOrder = async(authtoken, orderId, orderstatus)=>
await axios.put(process.env.REACT_APP_API + "/admin/order-status",{orderId, orderstatus},{
  headers: {
    authtoken 
  }
})

//! Get order (history order)
export const getOrdersAdmin = async (authtoken) => {
  // console.log(authtoken)
  return axios.get(
    process.env.REACT_APP_API + "/admin/orders",
    {
      headers: {
        authtoken, // send token with the header
      },
    }
  );
};
//! Get order (history order)
export const removeOrder = async(authtoken, id)=>
await axios.delete(process.env.REACT_APP_API + "/admin/orders/"+id,{
  headers: {
    authtoken
  }
})