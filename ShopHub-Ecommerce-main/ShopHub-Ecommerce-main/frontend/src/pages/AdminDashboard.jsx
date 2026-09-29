import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

try {

const token =
localStorage.getItem("token");

const res = await api.get(
"/orders/all",
{
headers:{
Authorization:
`Bearer ${token}`
}
}
);

setOrders(res.data.orders);

}

catch(error){

console.log(error);

}

};

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Product Deleted 🗑️");

      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete Product ❌");
    }
  };
        const updateStatus = async (
            id,
            status
            ) => {
            try {
      
            const token =
            localStorage.getItem("token");
            await api.put(

            `/orders/status/${id}`,
            { status },
            {
            headers:{
            
            Authorization:
            `Bearer ${token}`
            
            }
            
            }
            
            );
            
            setOrders(prev =>
            
            prev.map(order =>
            
            order._id===id
            
            ?{...order,status}:order
              )
            );
            }
            catch(error){
            console.log(error);
            toast.error("Failed To Update Status ❌");
            }
          };
            
  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">

        <h1 className="text-2xl sm:text-4xl font-bold">
          Admin Dashboard
        </h1>

        <Link
          to="/admin/add-product"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
        >
          Add Product
        </Link>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500">
            Total Products
          </h2>

          <p className="text-4xl font-bold mt-2">
            {products.length}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500">
            Categories
          </h2>

          <p className="text-4xl font-bold mt-2">
            {
              new Set(
                products.map(
                  (p) => p.category
                )
              ).size
            }
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6">
          <h2 className="text-gray-500">
            Inventory
          </h2>

          <p className="text-4xl font-bold mt-2">
            {products.reduce(
              (total, p) =>
                total + p.stock,
              0
            )}
          </p>
        </div>

      </div>

      {/* Products Table */}

      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="text-left p-4">
                Product
              </th>

              <th className="text-left p-4">
                Price
              </th>

              <th className="text-left p-4">
                Stock
              </th>

              <th className="text-left p-4">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t"
              >
                <td className="p-4">
                  {product.name}
                </td>

                <td className="p-4">
                  ₹ {product.price}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4 flex gap-3">

                  <Link
                    to={`/admin/edit-product/${product._id}`}
                  >
                    <button className="bg-yellow-500 text-white px-3 py-2 rounded">
                      Edit
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      deleteProduct(
                        product._id
                      )
                    }
                    className="bg-red-500 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>
      <div className="md:hidden space-y-4">
                
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <h2 className="text-xl font-bold">
              {product.name}
            </h2>
        
            <p className="text-blue-600 font-semibold mt-2">
              ₹ {product.price}
            </p>
        
            <p className="text-gray-600 mt-1">
              Stock: {product.stock}
            </p>
        
            <div className="flex gap-3 mt-4">
        
              <Link
                to={`/admin/edit-product/${product._id}`}
              >
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                  Edit
                </button>
              </Link>
        
              <button
                onClick={() =>
                  deleteProduct(product._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              
            </div>
          </div>
        ))}
      
      </div>
      {/* Manage Orders */}
      
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-6">
          Manage Orders
        </h2>
        {orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}

              className="bg-white p-6 rounded-xl shadow mb-5"
      
            >
      
              <h3 className="font-bold text-xl">
      
                {order.user?.name}
      
              </h3>
      
              <p className="text-gray-500">
      
                {order.user?.email}
      
              </p>
      
              <p className="mt-3 font-semibold">
      
                ₹ {order.totalPrice}
      
              </p>
      
              <p className="mt-2">

                Current Status :
              
                <span
                  className={`ml-2 font-bold ${
                    order.status === "Pending"
                      ? "text-yellow-500"
              
                      : order.status === "Processing"
                      ? "text-blue-500"
              
                      : order.status === "Shipped"
                      ? "text-indigo-500"
              
                      : order.status === "Delivered"
                      ? "text-green-500"
              
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </span>
              
              </p>
      
              <select
      
                value={order.status}
      
                onChange={(e) =>
      
                  updateStatus(
      
                    order._id,
      
                    e.target.value
      
                  )
      
                }
      
                className="
                    mt-4
                    px-5
                    py-3
                    rounded-xl
                    border
                    border-gray-200
                    shadow-sm
                    font-semibold
                    bg-white
                    hover:border-blue-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    transition-all
                    "
                 >   
                <option value="Pending">
      
                  Pending
      
                </option>
      
                <option value="Processing">
      
                  Processing
      
                </option>
      
                <option value="Shipped">
      
                  Shipped
      
                </option>
      
                <option value="Delivered">
      
                  Delivered
      
                </option>
      
                <option value="Cancelled">
      
                  Cancelled
      
                </option>
      
              </select>
      
            </div>
      
          ))
      
        )}
      
      </div>

    </div>
  );
}

export default AdminDashboard;