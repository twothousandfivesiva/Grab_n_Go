const express=require("express");
const { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails,createProductReview,getProductReviews,deleteReview } = require("../controllers/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router =express.Router();
router.route("/products").get(getAllProducts);//To retrieve data from the server.
router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);//To send data to the server to create something new.
router.route("/product/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)//put:To update or replace existing data on the server.
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);
module.exports=router;