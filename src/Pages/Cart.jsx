import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { LuGift } from "react-icons/lu";
import { Link } from "react-router-dom";
import useProductData from "../Data/useProductData";
import Layout from "../Layout";
import { Table } from "react-bootstrap";

const Cart = ({ updateCartItemNumber }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const { loading, error, data } = useProductData("categories/Bestsellers");

  useEffect(() => {
    if (!loading && !error && data) {
      setFilteredProducts(data);
    }
  }, [loading, error, data]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cartData);
    // Update cart item number in the header
    updateCartItemNumber(cartData.length);
  }, [updateCartItemNumber]);

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.uid !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    // Update cart item number in the header
    updateCartItemNumber(updatedCart.length);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.uid === productId
        ? { ...item, nextQuantity: Math.max(item.nextQuantity - 1, 1) }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cartItems.map((item) =>
      item.uid === productId
        ? { ...item, nextQuantity: item.nextQuantity + 1 }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalAmount = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total +=
        parseFloat(item.originalPrice?.replace("$", "") || 0) *
        item.nextQuantity;
    });
    let shippingCost = 0;
    if (total < 100) {
      shippingCost = 50;
    } else if (total < 200) {
      shippingCost = 30;
    } // No shipping cost if total is $200 or more
    return { total, shippingCost };
  };

  const { total, shippingCost } = totalAmount();

  return (
    <Layout>
      <div className="container my-3 p-3">
        <div className="title-cart h4 mb-4 text-center">Your cart</div>
        {cartItems.length > 0 ? (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.imageURL}
                          alt="cart-item"
                          className="mr-2"
                          style={{ width: "60px", height: "45px" }}
                        />
                        <div>
                          <div className="product-name font-weight-bold text-secondary">
                            {item.Name}
                          </div>
                          <div className="text-xs">
                            {item.Mg} X {item.noOfPacks}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="quant-minus btn btn-sm bg-secondary text-white"
                          onClick={() => decreaseQuantity(item.uid)}
                        >
                          -
                        </button>
                        <input
                          name={`p[${item.uid}]`}
                          className="quant form-control mx-1 text-center"
                          type="text"
                          style={{ width: "45px", height: "25px" }}
                          maxLength="2"
                          value={item.nextQuantity}
                          readOnly
                        />
                        <button
                          className="quant-plus btn btn-sm bg-secondary text-white"
                          onClick={() => increaseQuantity(item.uid)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-sm text-secondary">
                      {item.originalPrice}
                    </td>
                    <td className="text-bold h6">
                      $
                      {(
                        parseFloat(item.originalPrice?.replace("$", "") || 0) *
                        item.nextQuantity
                      ).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="btn text-danger"
                        onClick={() => removeFromCart(item.uid)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="3" className="font-weight-bold text-left">
                    Shipping Cost:
                  </td>
                  <td className="font-weight-bold h6">
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td colSpan="3" className="font-weight-bold text-left">
                    Pay for all items:
                  </td>
                  <td className="font-weight-bold h6">${total.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="text-center">Your cart is empty</div>
        )}

        <div className="cart-nav mt-4 flex justify-between">
          <Link to="/" className="btn btn-outline-dark text-sm">
            CONTINUE SHOPPING
          </Link>
          <Link to="/checkout" className="btn btn-primary text-light text-sm">
            Check Out
          </Link>
        </div>

        <div className="block border border-success p-3 mt-4" id="cart_bonuses">
          <div className="ctitle font-weight-bold d-flex align-items-center">
            <LuGift />
            <div className="pl-2 h5 text-success">
              Our discount gifts for all reliable consumers:
            </div>
          </div>
          <div className="bonus_for_consumers">
            <div className="row text-sm">
              <div className="col-12">
                <div className="d-flex align-items-center mb-2">
                  <div className="cheker-bonus">
                    <FaCheck color="blue" size={24} />
                  </div>
                  <div className="cheker-descr">
                    10% discount for all next orders
                  </div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="cheker-bonus">
                    <FaCheck color="blue" size={24} />
                  </div>
                  <div className="cheker-descr" style={{ color: "gray" }}>
                    Free standard airmail service for all orders with a sum
                    starting at $200
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="cheker-bonus">
                    <FaCheck color="blue" size={24} />
                  </div>
                  <div className="cheker-descr" style={{ color: "gray" }}>
                    Free trackable courier service for all orders with a sum
                    starting at $300
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex flex-column">
          <div className="py-5 gap-3">
            <h4 className="h4 text-center">OUR BESTSELLERS:</h4>
            <hr />
          </div>
          <div className="grid grid-cols-2 gap-3 justify-center md:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <div
                key={product.URL}
                className="max-w-[300px] bg-white border rounded-md overflow-hidden shadow-md p-4"
              >
                <Link
                    to={`/product/${product._id}`}><h1 className="text-sm font-semibold mb-2">{product.Name}</h1></Link>
                <div className="flex justify-center">
                <Link
                    to={`/product/${product._id}`}><img
                    src={product.URL}
                    alt={product.name}
                    title={product.name}
                    className="w-auto h-auto mb-2"
                  /></Link>
                </div>
                <p className="text-xs text-blue-400 mb-2">
                  {product.packaging}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-semibold">
                    {product["Discount price1"]}
                  </p>
                  <Link
                    to={`/product/${product._id}`}
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md"
                  >
                    SELECT PACK
                  </Link>
                </div>
                <p className="mt-2 text-xs text-red-600">
                  Manufacturer's Suggested Retail Price{" "}
                  {product["Original price1"]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
