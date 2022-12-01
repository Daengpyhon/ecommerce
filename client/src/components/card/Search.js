import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
const Search = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {search} = useSelector((state)=>({...state}))
  const {text} = search;
 const handleChange = (e)=>{
 // console.log(e.target.value)
 dispatch({
  type : "SEARCH_QUERY",
  payload : {text:e.target.value}
 })
 }
 const handleSubmit = (e)=>{
 e.preventDefault();
  navigate("/shop?"+text)

 }
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="search" className="form-control" placeholder="ຄົ້ນຫາ..."/>
    </form>
  )
}

export default Search