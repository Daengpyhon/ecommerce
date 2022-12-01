import axios from "axios";
//! Create product
export const createProduct = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/product", value, {
    headers: {
      authtoken,
    },
  });
};
//! List products
export const listProducts = async (count) => {
  return await axios.get(process.env.REACT_APP_API + "/product/"+count)
}
//! Remove product
export const removeProduct = async(authtoken, id)=>
await axios.delete(process.env.REACT_APP_API + "/product/"+id,{
  headers: {
    authtoken
  }
})

//! Read a product
export const readProduct = async (id) => {
  return await axios.get(process.env.REACT_APP_API + "/products/"+id)
}
//! Update product
export const updateProduct = async(authtoken, id, product)=>
await axios.put(process.env.REACT_APP_API + "/product/"+id,product,{
  headers: {
    authtoken 
  }
})

//! List by
export const listProductBy = async (sort, order, limit) => {
  return await axios.post(process.env.REACT_APP_API + "/productby", {
    sort, order, limit
  })
}

//! Search

export const searchFilters = async(arg)=>
await axios.post(process.env.REACT_APP_API + "/search/filters",arg)

