import { Fragment, useState } from 'react'
import "./Products.css";
import  { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider"; 
import { toast } from "react-toastify";


import Typography from "@mui/material/Typography";
import MetaData from '../layout/MetaData';
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Car"
];

const Products = () => {
    const dispatch = useDispatch();
     const [currentPage, setCurrentPage] = useState(1);
      const [price, setPrice] = useState([0, 25000]);
        const [category, setCategory] = useState("");
        const [ratings, setRatings] = useState(0);

    const { keyword } = useParams();
      const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
   const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
   const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const priceCommittedHandler = () => {
  dispatch(getProduct(keyword, currentPage, price,category,ratings)); // only triggers API after release
};

  let count = filteredProductsCount;
    useEffect(() => {
        if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }
     dispatch(getProduct(keyword,currentPage,price,category,ratings));
    },[dispatch,keyword,currentPage,category,ratings]);
  return (
  <Fragment>
    {loading?(<Loader/>):(
    <Fragment>
     <MetaData title="PRODUCTS --GRAB 'N GO" />
 <h2 className="productsHeading">Products</h2>

          <div className="products">
             {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
             <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
            
              value={price}
              onChange={priceHandler}
               onChangeCommitted={priceCommittedHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            
                 sx={{ width: "100%" }}  // expands inside filterBox
            /> 
           
              <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)
                        
                  }
                >
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
            {resultPerPage <count&& (
           <div className="paginationBox">
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
            )}
  </Fragment>)}
  </Fragment>
  ); 
  
};

export default Products
// import { Fragment, useEffect, useState } from "react";
// import "./Products.css";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import Loader from "../layout/Loader/Loader";
// import ProductCard from "../Home/ProductCard";
// import { useParams } from "react-router-dom";
// import Pagination from "react-js-pagination";
// import Slider from "@mui/material/Slider";
// import Typography from "@mui/material/Typography";

// const categories = [
//   "Laptop",
//   "Footwear",
//   "Bottom",
//   "Tops",
//   "Attire",
//   "Camera",
//   "SmartPhones",
//   "Car"
// ];

// const Products = () => {
//   const dispatch = useDispatch();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [price, setPrice] = useState([0, 25000]);
//   const [category, setCategory] = useState("");
//   const [ratings, setRatings] = useState(0);

//   const { keyword } = useParams();
//   const {
//     products,
//     loading,
//     error,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount
//   } = useSelector((state) => state.products);

//   // 🔁 Only call this when filters (except price) change
//   useEffect(() => {
//     if (error) {
//       alert(error);
//       dispatch(clearErrors());
//     }
//     dispatch(getProduct(keyword, currentPage, price, category, ratings));
//   }, [dispatch, keyword, currentPage, category, ratings]);

//   // ✅ Only dispatch API call after price is committed (user stops dragging)
//   const handlePriceCommit = () => {
//     dispatch(getProduct(keyword, currentPage, price, category, ratings));
//   };

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <h2 className="productsHeading">Products</h2>

//           <div className="products">
//             {products &&
//               products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//           </div>

//           <div className="filterBox">
//             <Typography>Price</Typography>
//             <Slider
//               value={price}
//               onChange={(e, newPrice) => setPrice(newPrice)} // slider smooth
//               onChangeCommitted={handlePriceCommit} // call API here only
//               valueLabelDisplay="auto"
//               min={0}
//               max={25000}
//             />

//             <Typography>Categories</Typography>
//             <ul className="categoryBox">
//               {categories.map((cat) => (
//                 <li
//                   key={cat}
//                   className="category-link"
//                   onClick={() => {
//                     setCategory(cat);
//                     setCurrentPage(1);
//                   }}
//                 >
//                   {cat}
//                 </li>
//               ))}
//             </ul>

//             <fieldset>
//               <Typography component="legend">Ratings Above</Typography>
//               <Slider
//                 value={ratings}
//                 onChange={(e, newRating) => {
//                   setRatings(newRating);
//                   setCurrentPage(1);
//                 }}
//                 valueLabelDisplay="auto"
//                 min={0}
//                 max={5}
//               />
//             </fieldset>
//           </div>

//           {resultPerPage < filteredProductsCount && (
//             <div className="paginationBox">
//               <Pagination
//                 activePage={currentPage}
//                 itemsCountPerPage={resultPerPage}
//                 totalItemsCount={productsCount}
//                 onChange={(e) => setCurrentPage(e)}
//                 nextPageText="Next"
//                 prevPageText="Prev"
//                 firstPageText="1st"
//                 lastPageText="Last"
//                 itemClass="page-item"
//                 linkClass="page-link"
//                 activeClass="pageItemActive"
//                 activeLinkClass="pageLinkActive"
//               />
//             </div>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Products;
