// import React, { useState, useEffect } from "react";
// import Layout from "./../components/Layout/Layout";
// import { useCart } from "../context/cart";
// import { useAuth } from "../context/auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// // import { AiFillWarning } from "react-icons/ai";
// import axios from "axios";
// import toast from "react-hot-toast";
// import "../styles/CartStyles.css";

// const CartPage = ({ _id, name, quantity}) => {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const [clientToken, setClientToken] = useState("");
//   const [instance, setInstance] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const [quantity,setQuantity]=useState(1)

//   //quantity increase and decrise 
//   const IncrementHandler = item => {
//     this.setState(prevState => ({
//       quantity: prevState.quantity.map(quantity =>
//         quantity._id === pid
//           ? {
//               ...quantity,
//               qty: quantity.qty + 1,
//             }
//           : quantity,
//       ),
//     }));
//   };


//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//         return null; // Add a return statement here
//       });
//       return total.toLocaleString("en-US", {
//         style: "currency",
//         currency: "BDT",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get payment gateway token
//   const getToken = async () => {
//     try {
//       const { data } = await axios.get("/api/v1/product/braintree/token");
//       setClientToken(data?.clientToken);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getToken();
//   }, [auth?.token]);

//   //handle payments
//   const handlePayment = async () => {
//     try {
//       setLoading(true);
//       const { nonce } = await instance.requestPaymentMethod();
//       const { data } = await axios.post("/api/v1/product/braintree/payment", {
//         nonce,
//         cart,
//       });
//       setLoading(false);
//       localStorage.removeItem("cart");
//       setCart([]);
//       navigate("/dashboard/user/orders");
//       toast.success("Payment Completed Successfully ");
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };
//   return (
//     <Layout title={"Accept All - Payment Method"}>
//       <div className=" cart-page">
//         <div className="row">
//           <div className="col-md-12">
//             <h1 className="text-center bg-light mt-5 pt-100 mb-1">
//               {!auth?.user
//                 ? "Hello Guest"
//                 : `Hello  ${auth?.token && auth?.user?.name}`}
//               <p className="text-center">
//                 {cart?.length
//                   ? `You Have ${cart.length} items in your cart ${auth?.token ? "" : "please login to checkout !"
//                   }`
//                   : " Your Cart Is Empty"}
//               </p>
//             </h1>
//           </div>
//         </div>
//         <div className="container ">
//           <div className="row ">
//             <div className="col-12 p-0 m-0">
//               <div className="product-info d-flex py-3 border gx-0">
//                 <div className="product-image col-3">Product Image</div>
//                 <div className="product-title col-3">Product Title</div>
//                 <div className="unit-price col">Unit price</div>
//                 <div className="quantity col">Quantity</div>
//                 <div className="total col">Price</div>
//                 <div className="action col">Remove item</div>
//               </div>
//               {cart?.map((p) => (
//                 <div className="row card flex-row" key={p._id}>
//                   <div className="col-3">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       className="card-img-top"
//                       alt={p.name}
//                       width="100%"
//                       height={"130px"}
//                     />
//                   </div>
//                   <div className="col-3">
//                     <p>{p.name}</p>
//                     {/* <p>{p.description.substring(0, 30)}</p> */}
//                     {/* <p>Price : {p.price}</p> */}
//                   </div>
//                   <div className="col">
//                     <p>{p.price}</p>
//                   </div>
//                   <div className="col">
//                     {itemQuantity}
//                     <button onClick={decreaseQuantity}>Decrease</button>
//                     <button onClick={increaseQuantity}>Increase</button>
//                   </div>
//                   <div className="col">
//                     <p>{(p.price) * quantity}</p>
//                   </div>
//                   <div className="col cart-remove-btn">
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="row">
//             <div className="col-md-5 cart-summary ">
//               <h2>Cart Summary</h2>
//               <p>Total | Checkout | Payment</p>
//               <hr />
//               <h4>Total : {totalPrice()} </h4>
//               {auth?.user?.address ? (
//                 <>
//                   <div className="mb-3">
//                     <h4>Current Address</h4>
//                     <h5>{auth?.user?.address}</h5>
//                     <button
//                       className="btn btn-outline-dark"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="mb-3">
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() =>
//                         navigate("/login", {
//                           state: "/cart",
//                         })
//                       }
//                     >
//                       Plase Login to checkout
//                     </button>
//                   )}
//                 </div>
//               )}
//               <div className="mt-2">
//                 {!clientToken || !auth?.token || !cart?.length ? (
//                   ""
//                 ) : (
//                   <>
//                     <DropIn
//                       options={{
//                         authorization: clientToken,
//                         paypal: {
//                           flow: "vault",
//                         },
//                       }}
//                       onInstance={(instance) => setInstance(instance)}
//                     />

//                     <button
//                       className="btn btn-info"
//                       onClick={handlePayment}
//                       disabled={loading || !instance || !auth?.user?.address}
//                     >
//                       {loading ? "Processing ...." : "Make Payment"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <div className="container ">
//           <div className="row ">
//             <div className="col-md-7  p-0 m-0">
//               {cart?.map((p) => (
//                 <div className="row card flex-row" key={p._id}>
//                   <div className="col-md-4">
//                     <img
//                       src={`/api/v1/product/product-photo/${p._id}`}
//                       className="card-img-top"
//                       alt={p.name}
//                       width="100%"
//                       height={"130px"}
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <p>{p.name}</p>
//                     <p>{p.description.substring(0, 30)}</p>
//                     <p>Price : {p.price}</p>
//                   </div>
//                   <div className="col-md-4 cart-remove-btn">
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => removeCartItem(p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="col-md-5 cart-summary ">
//               <h2>Cart Summary</h2>
//               <p>Total | Checkout | Payment</p>
//               <hr />
//               <h4>Total : {totalPrice()} </h4>
//               {auth?.user?.address ? (
//                 <>
//                   <div className="mb-3">
//                     <h4>Current Address</h4>
//                     <h5>{auth?.user?.address}</h5>
//                     <button
//                       className="btn btn-outline-dark"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="mb-3">
//                   {auth?.token ? (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() => navigate("/dashboard/user/profile")}
//                     >
//                       Update Address
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-outline-warning"
//                       onClick={() =>
//                         navigate("/login", {
//                           state: "/cart",
//                         })
//                       }
//                     >
//                       Plase Login to checkout
//                     </button>
//                   )}
//                 </div>
//               )}
//               <div className="mt-2">
//                 {!clientToken || !auth?.token || !cart?.length ? (
//                   ""
//                 ) : (
//                   <>
//                     <DropIn
//                       options={{
//                         authorization: clientToken,
//                         paypal: {
//                           flow: "vault",
//                         },
//                       }}
//                       onInstance={(instance) => setInstance(instance)}
//                     />

//                     <button
//                       className="btn btn-info"
//                       onClick={handlePayment}
//                       disabled={loading || !instance || !auth?.user?.address}
//                     >
//                       {loading ? "Processing ...." : "Make Payment"}
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div> */}
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
