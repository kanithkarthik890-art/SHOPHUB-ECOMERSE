import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      
      const res = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Orders:", res.data.orders);

      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold">
          Loading Orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

      <h1 className="text-2xl sm:text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No Orders Found
          </h2>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 mb-6"
          >

            {/* Order Header */}

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">

              <div>
                <h2 className="font-bold text-lg">
                  Order ID
                </h2>

                <p className="text-gray-500 text-sm">
                  {order._id}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p className="mt-2">
                   <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">     
                     💰 Cash On Delivery      
                   </span>      
                </p>
              </div>

              <span
                className={`
                  px-5
                  py-2
                  rounded-full
                  font-bold
                  shadow-md
              
                  ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
              
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"
              
                      : order.status === "Shipped"
                      ? "bg-indigo-100 text-indigo-700"
              
                      : order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
              
                      : "bg-red-100 text-red-700"
                  }
                `}
              >
                {
                  order.status === "Pending"
                    ? "⏳ Pending"
              
                    : order.status === "Processing"
                    ? "⚙️ Processing"
              
                    : order.status === "Shipped"
                    ? "🚚 Shipped"
              
                    : order.status === "Delivered"
                    ? "✅ Delivered"
              
                    : "❌ Cancelled"
                }
              </span>
              <div className="mt-5 w-full sm:w-[350px]">

  <div className="flex justify-between text-sm font-medium mb-2">

    <span
      className={
        ["Pending", "Processing", "Shipped", "Delivered"].includes(
          order.status
        )
          ? "text-green-600"
          : "text-gray-400"
      }
    >
      ✓ Pending
    </span>

    <span
      className={
        ["Processing", "Shipped", "Delivered"].includes(
          order.status
        )
          ? "text-green-600"
          : "text-gray-400"
      }
    >
      ✓ Processing
    </span>

    <span
      className={
        ["Shipped", "Delivered"].includes(
          order.status
        )
          ? "text-green-600"
          : "text-gray-400"
      }
    >
      ✓ Shipped
    </span>
  
              <span
                className={
                  order.status === "Delivered"
                    ? "text-green-600"
                    : "text-gray-400"
                }
              >
                ✓ Delivered
              </span>
          
            </div>
          
            <div className="w-full h-2 bg-gray-200 rounded-full">
          
              <div
                className={`
          
                h-2
          
                rounded-full
          
                transition-all
          
                duration-500
          
                ${
          
                order.status === "Pending"
          
                ? "w-[25%] bg-yellow-500"
          
                : order.status === "Processing"
          
                ? "w-[50%] bg-blue-500"
          
                : order.status === "Shipped"
          
                ? "w-[75%] bg-indigo-500"
          
                : order.status === "Delivered"
          
                ? "w-full bg-green-500"
          
                : "w-full bg-red-500"
          
                }
          
                `}
              ></div>
          
            </div>
          
          </div>

            </div>

            {/* Products */}

            <div className="space-y-3">

              {order.products?.map((item, index) => (
                <div
                  key={item._id || index}
                  className="border rounded-xl p-4 flex flex-col sm:flex-row gap-4 hover:shadow-md transition-all duration-300"
                >

                  <img
                    src={
                      item.product?.image ||
                      "https://placehold.co/400x400?text=No+Image"
                    }
                    alt={
                      item.product?.name || "Product"
                    }
                    className="w-full sm:w-24 h-40 sm:h-24 object-cover rounded-lg"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold text-lg">
                      {item.product?.name ||
                        "Product Removed"}
                    </h3>

                    <p className="text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="text-blue-600 font-bold">
                      ₹ {item.product?.price || 0}
                    </p>

                        <div className="mt-4 text-gray-600">

                          <p>
                            🚚 Delivery in 3-5 Days
                          </p>
                        
                          <p>
                            💰 Cash On Delivery Available
                          </p>
                        
                        </div>
                  </div>

                </div>
              ))}

            </div>
            {order.status !== "Delivered" && (
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
              >
                Cancel Order
              </button>
              
            )}
            {/* Total */}
            <div className="flex flex-wrap gap-3 mt-4">

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                🔒 Secure Order
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                🚚 Fast Delivery
              </span>

              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                ↩️ Easy Returns
              </span>

            </div>
            <div className="mt-6 border-t pt-4">

              <div className="flex justify-between text-gray-600">
                <span>Total Items</span>
                <span>{order.products.length}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="font-semibold">
                  Total Amount
                </span>

                <span className="text-2xl font-bold text-blue-600">
                  ₹ {order.totalPrice}
                </span>
              </div>

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default Orders;