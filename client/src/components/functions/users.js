import axios from "axios";

export const listUser = async (authtoken) => {
  // console.log(authtoken)
  return axios.get(process.env.REACT_APP_API + "/users", {
    headers: {
      authtoken, /// send token with the header
    },
  });
};

export const changeStatus = async (authtoken, value) => {
  // console.log(authtoken)
  return axios.post(process.env.REACT_APP_API + "/change-status", value, {
    headers: {
      authtoken, /// send token with the header
    },
  });
};

export const changeRole = async (authtoken, value) => {
  // console.log(authtoken)
  return axios.post(process.env.REACT_APP_API + "/change-role", value, {
    headers: {
      authtoken, /// send token with the header
    },
  });
};
//! Remove user
export const removeUser = async (authtoken, id) => {
  // console.log(authtoken)
  return axios.delete(process.env.REACT_APP_API + "/users/" + id, {
    headers: {
      authtoken, /// send token with the header
    },
  });
};

// ! Change Password
export const resetPassword = async (authtoken, id, value) => {
  // console.log(authtoken)
  return axios.put(process.env.REACT_APP_API + "/users/" + id, value, {
    headers: {
      authtoken, /// send token with the header
    },
  });
};

// ! Insert data order cart to store
export const userCart = async (authtoken, cart) => {
  // console.log(authtoken)
  return axios.post(
    process.env.REACT_APP_API + "/user/cart",
    { cart },
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};
//! Fetch user information from  Cart
export const getUserCart = async (authtoken) => {
  // console.log(authtoken)
  return axios.get(
    process.env.REACT_APP_API + "/user/cart",
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};
//! Clear Cart
export const emptyCart = async (authtoken) => {
  // console.log(authtoken)
  return axios.delete(
    process.env.REACT_APP_API + "/user/cart",
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};
//! Save address
export const saveAddress = async (authtoken, address) => {
  // console.log(authtoken)
  return axios.post(
    process.env.REACT_APP_API + "/user/address",
    { address },
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};

// ! Create order
export const saveOrder = async (authtoken) => {
  return axios.post(
    process.env.REACT_APP_API + "/user/order",
    {  },
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};

//! Get order (history order)
export const getOrders = async (authtoken) => {
  // console.log(authtoken)
  return axios.get(
    process.env.REACT_APP_API + "/user/orders",
    {
      headers: {
        authtoken, // send token with the header
      },
    }
  );
};

// !  GET wishlist
export const getWishlist = async (authtoken) => {
  // console.log(authtoken)
  return axios.get(
    process.env.REACT_APP_API + "/user/wishlist",
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};
// !  POST wishlist
export const addToWishList = async (authtoken, productId) => {
  // console.log(authtoken)
  return axios.post(
    process.env.REACT_APP_API + "/user/wishlist",{productId},
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};
// !  Remove wishlist
export const removeWishList = async (authtoken, productId) => {
  // console.log(authtoken)
  return axios.put(
    process.env.REACT_APP_API + "/user/wishlist/"+productId,{},
    {
      headers: {
        authtoken, /// send token with the header
      },
    }
  );
};