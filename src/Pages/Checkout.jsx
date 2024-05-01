import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Layout from "../Layout";
import PaymentSuccessAlert from '../components/PaymentSuccessAlert';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [customerInfo, setCustomerInfo] = useState({
    phone: "",
    email: "",
  });
  const [customerInfoErrors, setCustomerInfoErrors] = useState({});
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zip: "",
  });
  const [shippingAddressErrors, setShippingAddressErrors] = useState({});
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    state: "",
    zip: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
    coupon: "",
  });
  const [paymentInfoErrors, setPaymentInfoErrors] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCartProducts(cartData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerErrors = validateCustomerInfo();
    const shippingErrors = validateAddress(shippingAddress);
    const paymentErrors = validatePaymentInfo();
  
    if (
      Object.keys(customerErrors).length === 0 &&
      Object.keys(shippingErrors).length === 0 &&
      Object.keys(paymentErrors).length === 0
    ) {
      console.log("Form submitted successfully");
  
      setTimeout(() => {
        setPaymentSuccessful(true);
      }, 2000);
  const totalPrice = calculateTotalPrice(cartProducts);
      const formData = {
        customerInfo,
        shippingAddress,
        billingAddress: sameAsShipping ? shippingAddress : billingAddress,
        paymentInfo,
        cartProducts,totalPrice,
      };
  
      try {
        const response = await fetch("https://pharmecy-backend.onrender.com/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error("Failed to store order details");
        }
  
        clearCartAndOrderDetails();
      } catch (error) {
        console.error("Error:", error.message);
      }
    } else {
      setCustomerInfoErrors(customerErrors);
      setShippingAddressErrors(shippingErrors);
      setPaymentInfoErrors(paymentErrors);
    }
  };
  
  
  const handleModalClose = () => {
    setPaymentSuccessful(false);
    setRedirectToHome(true);
  };

  useEffect(() => {
    if (redirectToHome) {
        navigate("/");
    }
  });

  const clearCartAndOrderDetails = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("order-details");
    setCartProducts([]);
  };
  
  const validateCustomerInfo = () => {
    let errors = {};
    if (!customerInfo.phone.trim()) {
      errors.phone = "Phone is required";
    }
    if (!customerInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = "Email is invalid";
    }
    return errors;
  };

  const validateAddress = (address) => {
    let errors = {};
    if (!address.firstName.trim()) {
      errors.firstName = "First Name is required";
    }
    if (!address.lastName.trim()) {
      errors.lastName = "Last Name is required";
    }
    if (!address.address.trim()) {
      errors.address = "Address is required";
    }
    if (!address.city.trim()) {
      errors.city = "City is required";
    }
    if (!address.country.trim()) {
      errors.country = "Country is required";
    }
    if (!address.state.trim()) {
      errors.state = "State is required";
    }
    if (!address.zip.trim()) {
      errors.zip = "ZIP is required";
    }
    return errors;
  };

  const validatePaymentInfo = () => {
    let errors = {};
    if (!paymentInfo.cardNumber.trim()) {
      errors.cardNumber = "Card Number is required";
    }
    if (!paymentInfo.expMonth.trim()) {
      errors.expMonth = "Expiration Month is required";
    }
    if (!paymentInfo.expYear.trim()) {
      errors.expYear = "Expiration Year is required";
    }
    if (!paymentInfo.cvc.trim()) {
      errors.cvc = "CVC is required";
    }
    return errors;
  };

  const calculateTotalPrice = (products) => {
    let total = products.reduce((total, product) => {
        return (
            total +
            parseFloat(product.originalPrice?.replace("$", "") || 0) *
            product.nextQuantity
        );
    }, 0);

    // Calculate shipping charges
    let shippingCost = 0;
    if (total < 100) {
        shippingCost = 50;
    } else if (total < 200) {
        shippingCost = 30;
    }
    total += shippingCost;

    return { total: parseFloat(total.toFixed(2)), shippingCost: parseFloat(shippingCost.toFixed(2)) };
};


  const handlePhoneChange = (value) => {
    const numericValue = value.replace(/\D/g, "");
    setCustomerInfo({ ...customerInfo, phone: numericValue });
  };

  const handleDeleteProduct = (index) => {
    const updatedCart = [...cartProducts];
    updatedCart.splice(index, 1);
    setCartProducts(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const orderDetails = JSON.parse(localStorage.getItem("order-details"));
    if (orderDetails) {
      const updatedOrderProducts = orderDetails.cartProducts.filter(
        (_, i) => i !== index
      );
      const updatedOrderDetails = {
        ...orderDetails,
        cartProducts: updatedOrderProducts,
      };
      localStorage.setItem(
        "order-details",
        JSON.stringify(updatedOrderDetails)
      );
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1 mx-3">
            <h2 className="text-lg font-bold mb-3">Contact Info</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4 row">
                <div className="col-sm">
                  <PhoneInput
                    country={"us"}
                    value={customerInfo.phone}
                    onChange={handlePhoneChange}
                    inputClass="form-control py-3 w-100"
                  />
                  {customerInfoErrors.phone && (
                    <div className="text-red-500">
                      {customerInfoErrors.phone}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4 row">
                <div className="col">
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        email: e.target.value,
                      })
                    }
                  />
                  {customerInfoErrors.email && (
                    <div className="text-red-500">
                      {customerInfoErrors.email}
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="md:col-span-1 mx-3">
            <h2 className="text-lg font-bold mb-3">Shipping Address</h2>
            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    value={shippingAddress.firstName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        firstName: e.target.value,
                      })
                    }
                  />
                  {shippingAddressErrors.firstName && (
                    <div className="text-red-500">
                      {shippingAddressErrors.firstName}
                    </div>
                  )}
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    value={shippingAddress.lastName}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        lastName: e.target.value,
                      })
                    }
                  />
                  {shippingAddressErrors.lastName && (
                    <div className="text-red-500">
                      {shippingAddressErrors.lastName}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Address"
                  value={shippingAddress.address}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      address: e.target.value,
                    })
                  }
                />
                {shippingAddressErrors.address && (
                  <div className="text-red-500">
                    {shippingAddressErrors.address}
                  </div>
                )}
              </div>
              <div className="row mb-4">
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        city: e.target.value,
                      })
                    }
                  />
                  {shippingAddressErrors.city && (
                    <div className="text-red-500">
                      {shippingAddressErrors.city}
                    </div>
                  )}
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        country: e.target.value,
                      })
                    }
                  />
                  {shippingAddressErrors.country && (
                    <div className="text-red-500">
                      {shippingAddressErrors.country}
                    </div>
                  )}
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={(e) =>
                      setShippingAddress({
                        ...shippingAddress,
                        state: e.target.value,
                      })
                    }
                  />
                  {shippingAddressErrors.state && (
                    <div className="text-red-500">
                      {shippingAddressErrors.state}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  className="form-control"
                  type="number"
                  placeholder="ZIP"
                  value={shippingAddress.zip}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      zip: e.target.value,
                    })
                  }
                />
                {shippingAddressErrors.zip && (
                  <div className="text-red-500">
                    {shippingAddressErrors.zip}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="sameAsShipping" className="form-check-label">
                  Same as Billing Address
                </label>
                <input
                  id="sameAsShipping"
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={() => setSameAsShipping(!sameAsShipping)}
                  className="form-check-input ms-2"
                />
              </div>
            </form>
          </div>
          
          <div className="md:col-span-1 mx-3">
            <h2 className="text-lg font-bold mb-3">Payment Info</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Card Number"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, "");
                    setPaymentInfo({
                      ...paymentInfo,
                      cardNumber:
                        input.length <= 16 ? input : input.slice(0, 16),
                    });
                  }}
                />
                {paymentInfoErrors.cardNumber && (
                  <div className="text-red-500">
                    {paymentInfoErrors.cardNumber}
                  </div>
                )}
              </div>
              <div className="row mb-4">
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Expiration Month"
                    value={paymentInfo.expMonth}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, "");
                      setPaymentInfo({
                        ...paymentInfo,
                        expMonth: input.length <= 2 ? input : input.slice(0, 2),
                      });
                    }}
                  />
                  {paymentInfoErrors.expMonth && (
                    <div className="text-red-500">
                      {paymentInfoErrors.expMonth}
                    </div>
                  )}
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Expiration Year"
                    value={paymentInfo.expYear}
                    onChange={(e) => {
                      const input = e.target.value.replace(/\D/g, "");
                      setPaymentInfo({
                        ...paymentInfo,
                        expYear: input.length <= 4 ? input : input.slice(0, 4),
                      });
                    }}
                  />
                  {paymentInfoErrors.expYear && (
                    <div className="text-red-500">
                      {paymentInfoErrors.expYear}
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="CVC"
                  value={paymentInfo.cvc}
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, "");
                    setPaymentInfo({
                      ...paymentInfo,
                      cvc: input.length <= 3 ? input : input.slice(0, 3),
                    });
                  }}
                />
                {paymentInfoErrors.cvc && (
                  <div className="text-red-500">{paymentInfoErrors.cvc}</div>
                )}
              </div>

              <div className="mb-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Coupon Code"
                  value={paymentInfo.coupon}
                  onChange={(e) =>
                    setPaymentInfo({ ...paymentInfo, coupon: e.target.value })
                  }
                />
              </div>
            </form>
          </div>

          <div className="md:col-span-1 mx-3">
            {/* Billing address form */}
            <form onSubmit={handleSubmit}>
              {/* Billing address form fields */}
              {!sameAsShipping && (
                <div>
                  <h2 className="text-lg font-bold mb-3">Billing Address</h2>
                  <div className="row mb-4">
                    <div className="col">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="First Name"
                        value={billingAddress.firstName}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            firstName: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Last Name"
                        value={billingAddress.lastName}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            lastName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Address"
                      value={billingAddress.address}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="row mb-4">
                    <div className="col">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="City"
                        value={billingAddress.city}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            city: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Country"
                        value={billingAddress.country}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            country: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="State"
                        value={billingAddress.state}
                        onChange={(e) =>
                          setBillingAddress({
                            ...billingAddress,
                            state: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      className="form-control"
                      type="number"
                      placeholder="ZIP"
                      value={billingAddress.zip}
                      onChange={(e) =>
                        setBillingAddress({
                          ...billingAddress,
                          zip: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
          
          
        </div>
        <div className="text-center">
            {cartProducts.length === 0 ? (
  ""
) : (
  <div className="my-4">
    <h2 className="text-lg font-bold mb-3">Cart Products</h2>
    <div className="table-responsive w-75 mx-auto">
      <table className="table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>NextQuantity</th>
            <th>Original Price</th>
          </tr>
        </thead>
        <tbody>
          {cartProducts.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={product.imageURL}
                  alt={product.Name}
                  width={50}
                />
              </td>
              <td>
                {product.Name}
                <p>
                  {product.Mg}X{product.noOfPacks}
                </p>
              </td>
              <td>{product.nextQuantity}</td>
              <td>
                $
                {(
                  parseFloat(
                    product.originalPrice?.replace("$", "") || 0
                  ) * product.nextQuantity
                ).toFixed(2)}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteProduct(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          
        </tbody>
      </table>
    </div><div className="flex flex-col items-center justify-start">
  <div className="w-64">
    <div className="flex justify-around text-center">
      <h1 className="text-left">Shipping Cost</h1>
      {calculateTotalPrice(cartProducts).shippingCost === 0 ? (
        <p>Free</p>
      ) : (
        <p>${calculateTotalPrice(cartProducts).shippingCost.toFixed(2)}</p>
      )}
    </div>
  </div>
  <div className="w-64">
    <div className="flex justify-around text-center">
      <h1 className="text-left">Total Price</h1>
      <p>${calculateTotalPrice(cartProducts).total.toFixed(2)}</p>
    </div>
  </div>
</div>
  </div>
)}



            {cartProducts.length === 0 ? (
              <div className="text-center">
                <h2>Your cart is empty</h2>
              </div>
            ) : (
              <div>
                <div className="text-center">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="btn btn-primary bg-success inline-block mt-4"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
      </div>
      <PaymentSuccessAlert show={paymentSuccessful} onClose={handleModalClose} />
    </Layout>
  );
};

export default CheckoutPage;
