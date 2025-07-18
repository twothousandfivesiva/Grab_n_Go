import React from 'react'
import{ Fragment,useEffect,useState } from 'react';
import  Carousel  from 'react-material-ui-carousel';
import "./ProductDetails.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import Loader from "../layout/Loader/Loader";
  import ReviewCard from "./ReviewCard.js";
  import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from '../layout/MetaData.js';
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = () => {
    
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails);
    console.log("Product Details state:", product, loading, error);
   
  
  useEffect(() => {
    
     if (error) {
    toast.error(error);
    dispatch(clearErrors());
  }
    dispatch(getProductDetails(id));
    }, [dispatch, id,error,toast]);
    const options = {
        edit:false,
   color:"rgba(20,20,20,0.1)",
   activeColor:"tomato",
   size:window.innerWidth<600?20:25,
    value: product.ratings,
  isHalf:true,
  };
  const [quantity, setQuantity] = useState(1);
  // const [open, setOpen] = useState(false);
  // const [rating, setRating] = useState(0);
  // const [comment, setComment] = useState("");
   const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

   const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    toast.success("Item Added To Cart");
  };   

  return (
     <Fragment>
      
         <ToastContainer  position="top-center" />
        {loading?<Loader/>:(<Fragment>
           <MetaData title={`${product.name} -- GRAB 'N GO`} />
        <div className="ProductDetails">
        
          <div>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>
             <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
                    <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input  type="number" value={quantity} readOnly />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button
                    // disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
               <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview">
                Submit Review
              </button>
              </div>
        </div>
         <h3 className="reviewsHeading">REVIEWS</h3>
             {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>)}
     </Fragment>
  );
};

export default ProductDetails