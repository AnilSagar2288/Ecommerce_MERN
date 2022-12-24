import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import MetaData from '../layout/MetaData';
import './Search.css'


const Search = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) =>{
        e.preventDefault();

        const loc = window.location.href
        const spl = loc.split("products/")[1]
        setKeyword(spl)
        if(keyword.trim()){          
            navigate(`/products/${keyword}`)
        }else{
            navigate("/products")
        }
    }
  return (
    <>
        <MetaData title="Search a Product" />
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
            type="text"
            placeholder="Search a Product ..."
            onChange={(e) => setKeyword(e.target.value)}
            />
        <input type="submit" value="Search" />
      </form>
    </>
  )
}

export default Search