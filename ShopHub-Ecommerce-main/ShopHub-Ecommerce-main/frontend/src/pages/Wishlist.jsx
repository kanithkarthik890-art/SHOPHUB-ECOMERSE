import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setItems(res.data.items);
      toast.success("Added To Wishlist ❤️");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Load Wishlist ❌");
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/wishlist/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Removed From Wishlist ❤️");

      setItems((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed To Remove ❌");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8">
          My Wishlist ❤️
        </h1>

        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        My Wishlist ❤️
      </h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Your Wishlist is Empty 💔
          </h2>

          <p className="text-gray-500">
            Add products you love and they'll appear here.
          </p>

          <Link
            to="/"
            className="inline-block mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >

              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">

                <h2 className="text-xl font-bold">
                  {item.product.name}
                </h2>

                <p className="text-gray-500 mt-2 line-clamp-2">
                  {item.product.description}
                </p>

                <p className="text-blue-600 text-2xl font-bold mt-4">
                  ₹ {item.product.price}
                </p>

                <div className="flex gap-3 mt-5">

                  <Link
                    to={`/products/${item.product._id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg"
                  >
                    View Product
                  </Link>

                  <button
                    onClick={() =>
                      removeWishlist(item._id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-lg"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Wishlist;