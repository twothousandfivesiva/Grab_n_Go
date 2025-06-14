// import {  combineReducers, } from '@reduxjs/toolkit';
// import {thunk} from "redux-thunk";

// import { configureStore } from '@reduxjs/toolkit';



// const reducer = combineReducers({

// });

// let initialState = {
 
// };

// const middleware = [thunk];

// const store = configureStore({
//   reducer,
//  initialState,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
// });

// export default store;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  
  productDetailsReducer,
  productsReducer

} from "./reducers/productReducer";
import { profileReducer, userReducer,forgotPasswordReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";



const reducer = combineReducers({
  // your reducers here
    products: productsReducer,
    productDetails: productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer
});

let preloadedState = {
   cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    // shippingInfo: localStorage.getItem("shippingInfo")
    //   ? JSON.parse(localStorage.getItem("shippingInfo"))
    //   : {},
  },
};



const store = configureStore({
  reducer,
preloadedState,
});

export default store;
