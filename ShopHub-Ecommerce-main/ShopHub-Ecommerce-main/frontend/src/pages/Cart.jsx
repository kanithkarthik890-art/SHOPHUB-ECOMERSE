import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data.cartItems);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Item Removed 🗑️");

      fetchCart();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Remove Item ❌");
    }
  };

  const placeOrder = async () => {
    try {
      console.log("Place Order Clicked");

      const token = localStorage.getItem("token");
      console.log("Token:", token);

      const products = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      console.log("Products:", products);

      const totalPrice = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );

      console.log("Total Price:", totalPrice);

      const res = await api.post(
        "/orders",
        {
          products,
          totalPrice,
          paymentMethod: "Cash On Delivery",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Order Response:", res.data);

      toast.success("Order Placed Successfully 🎉");
      setCartItems([]);
      navigate("/orders");
    } catch (error) {
      console.log("Order Error:", error);

      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Failed To Place Order ❌");
    }
  };
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const handleOnlinePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first 🔐");
        navigate("/login");
        return;
      }

      if (cartItems.length === 0) {
        toast.error("Your cart is empty 🛒");
        return;
      }

      const totalAmount = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      );

      // Step 1: Create Razorpay order
      const orderResponse = await api.post(
        "/payment/create-order",
        {
          amount: totalAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const razorpayOrder = orderResponse.data.order;

      // Step 2: Open Razorpay Checkout
      const options = {
        key: "rzp_test_TS75A3jSUqXBUF",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "ShopHub",
        description: "ShopHub Order",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            // Step 3: Verify payment on backend
            const products = cartItems.map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
            }));

            const verifyResponse = await api.post(
              "/payment/verify",
              {
                ...response,
                products,
                totalPrice: totalAmount,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            );

            if (verifyResponse.data.success) {
              toast.success("Payment Successful 🎉");

              setCartItems([]);

              navigate("/orders");
            }
          } catch (error) {
            console.log("Payment Verification Error:", error);

            toast.error(
              error.response?.data?.message || "Payment verification failed ❌",
            );
          }
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        theme: {
          color: "#2563eb",
        },

        modal: {
          ondismiss: function () {
            toast.error("Payment cancelled ❌");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.log("RAZORPAY PAYMENT FAILED:", response.error);
      });

      razorpay.open();
    } catch (error) {
      console.log("Online Payment Error:", error);

      toast.error(
        error.response?.data?.message || "Unable to start payment ❌",
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-2xl sm:text-4xl font-bold mb-8">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>

          <h2 className="text-3xl font-bold">Your Cart Is Empty</h2>

          <p className="text-gray-500 mt-3">
            Looks like you haven't added anything yet.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-md p-5 mb-5 flex flex-col sm:flex-row gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-bold">{item.product.name}</h2>

                  <p className="text-gray-500 mt-2">
                    {item.product.description}
                  </p>

                  <p className="text-blue-600 font-bold text-xl mt-3">
                    ₹ {item.product.price}
                  </p>

                  <p className="mt-2">Quantity: {item.quantity}</p>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="mt-4 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 h-fit lg:sticky lg:top-24">
            <h2 className="text-2xl font-bold mb-6">Price Details</h2>

            <div className="flex justify-between mb-4">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between mb-6">
              <span>Total Amount</span>

              <span className="font-bold text-xl">₹ {totalAmount}</span>
            </div>

            <div className="space-y-3">
              {/* Cash On Delivery */}
              <button
                onClick={placeOrder}
                disabled={cartItems.length === 0}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 hover:scale-[1.02]"
                }`}
              >
                🏠 Cash On Delivery
              </button>

              {/* Online Payment */}
              <button
                onClick={handleOnlinePayment}
                disabled={cartItems.length === 0}
                className={`w-full py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
                }`}
              >
                💳 Pay Online
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
