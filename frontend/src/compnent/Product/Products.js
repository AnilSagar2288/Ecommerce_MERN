import React, { useEffect, useState } from 'react'
import {clearErrors, getProduct} from "../../actions/productAction"
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Products.css';
import Pagination from "react-js-pagination"
import { useAlert } from 'react-alert'
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import MetaData from "../layout/MetaData";

const Products = () => {
    const alert = useAlert()
    const [keyword, setKeyword] = useState("");   
    const [currentPage, setCurrentPage]  = useState(1);
    const [price, setPrice] = useState([0, 30000])
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    

    const dispatch = useDispatch();
    const {loading,error,productsCount,products,resultPerPage} = useSelector(state => state.products)

    const setCurrentPageNo = (e) =>{
        setCurrentPage(e)
    }

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];

    // let count = filteredProductsCount;
    const priceHandler = (event,newPrice) =>{
        setPrice(newPrice)
    }

    const loc = window.location.href
    const spl = loc.split("products/")[1]
   
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors());
          }
          setKeyword(spl);
        dispatch(getProduct(keyword,currentPage,price,category,ratings))
    }, [dispatch,keyword,error,alert,currentPage,price,spl,category,ratings]);
  return <>
    {loading ? <Loader /> : 
        (
            <>
            <MetaData title="PRODUCTS -- ECOMMERCE" />
                <h2 className="productsHeading">Products</h2>
                <div className='products'>
                    {products && 
                        products.map(product=>(
                            <ProductCard key={product._id} product={product}/>
                        ))
                    }
                </div>

                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={30000}
                    />

                    <Typography>Category</Typography>
                    <ul className='categoryBox'>
                        {categories.map(category=>(
                            <li className='category-link' key={category} onClick={()=> setCategory(category)}>
                                {category}
                            </li>
                        ))}
                    </ul>


                    <fieldset>
                    <Typography component="legend">Ratings Above</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                        setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
                    </fieldset>
                </div>

                {resultPerPage < productsCount &&
                    <div className='paginationBox'>
                    <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="page-item"
                    linkClass="page-link"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                  />
                    </div>
                }
            </>
        )
    
    }
    
    </>
  
};

export default Products