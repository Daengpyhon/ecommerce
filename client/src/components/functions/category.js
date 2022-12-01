import axios from "axios";
//! Create Categry
export const createCategory = async (authtoken, value) => {
  return await axios.post(process.env.REACT_APP_API + "/category", value, {
    headers: {
      authtoken,
    },
  });
};
//! List of categories
export const listCategory = async (authtoken) =>
  await axios.get(process.env.REACT_APP_API + "/category", {
    headers: {
      authtoken,
    },
  });

//! Delete
export const deleteCategory = async (authtoken,id) =>
  await axios.delete(process.env.REACT_APP_API + "/category/" + id, {
    headers: {
      authtoken,
    },
  });

//! Read a Category
export const readCategory = async (authtoken,id) =>
  await axios.get(process.env.REACT_APP_API + "/category/" + id, {
    headers: {
      authtoken,
    },
  });

//! Update a category
export const editCategory = async ( authtoken,id, value) =>
  await axios.put(process.env.REACT_APP_API + "/category/" + id, value, {
    headers: {
      authtoken,
    },
  });
