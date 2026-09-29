import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";


function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
  try {
    const res = await api.get(
      `/reviews/${id}`
    );

    setReviews(res.data.reviews);
  } catch (error) {
    console.log(error);
  }
};

  const submitReview = async () => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/reviews",
      {
        product: id,
        rating,
        comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Review Added ⭐");

    setComment("");

    fetchReviews();
  } catch (error) {
    console.log(error);

    toast.error(
       error.response?.data?.message ||
       "Failed To Add Review"
    );
  }
};

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/cart",
        {
          product: product._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added To Cart 🛒");
      navigate("/cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Add Cart ❌");
    }
  };
   
const buyNow = async () => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      "/cart",
      {
        product: product._id,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Proceeding to checkout ⚡");

    navigate("/cart");
  } catch (error) {
    console.log(error);
    toast.error("Failed To Proceed ❌");
  }
};     

  if (!product) {
    return (
      <div className="text-center mt-10">
        <h2>Loading...</h2>
      </div>
    );
  }

return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
    <Link
      to="/"
      className="text-blue-600 font-medium"
    >
      ← Back to Products
    </Link>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mt-6">

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 sm:h-96 object-cover rounded-xl hover:scale-105 transition duration-500"
        />
      </div>

      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          {product.name}
        </h1>

        <div className="flex items-center gap-2 mt-3">

          <span className="text-yellow-500 text-xl">
            ⭐⭐⭐⭐⭐
          </span>
        
          <span className="text-gray-600">
            {product.rating?.toFixed(1) || 0}
          </span>
        
          <span className="text-gray-500">
            ({product.numReviews || 0} Reviews)
          </span>
        
        </div>

        <p className="text-gray-600 mt-4 text-lg">
          {product.description}
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold text-blue-600 mt-6">
          ₹ {product.price}
        </h2>

        <div className="mt-4 space-y-2">
          <p>
            <span className="font-semibold">
              Category:
            </span>{" "}
            {product.category}
          </p>

          <div className="flex items-center gap-3">

            <span className="font-semibold">
              Stock:
            </span>

            {product.stock > 0 ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                In Stock ✅
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                Out Of Stock ❌
              </span>
            )}

          </div>
        </div>

          <div className="flex items-center gap-4 mt-6">

            <button
              onClick={() =>
                quantity > 1 &&
                setQuantity(quantity - 1)
              }
              className="w-10 h-10 bg-gray-200 rounded-lg text-xl font-bold"
            >
              -
            </button>
          
            <span className="text-xl font-bold">
              {quantity}
            </span>
          
            <button
              onClick={() =>
                setQuantity(quantity + 1)
              }
              className="w-10 h-10 bg-gray-200 rounded-lg text-xl font-bold"
            >
              +
            </button>
          
          </div>
      <div className="flex flex-wrap gap-4 mt-8">

  <button
    onClick={addToCart}
    className="
      min-w-[200px]
      px-8 py-4
      rounded-2xl
      bg-gradient-to-r
      from-blue-600
      to-indigo-600
      text-white
      font-bold
      text-lg
      shadow-lg
      hover:shadow-red-500/40
      hover:scale-105
      transition-all
      duration-300
    "
  >
    🛒 Add To Cart
  </button>

  <button
    onClick={buyNow}
    className="
      min-w-[200px]
      px-8 py-4
      rounded-2xl
      bg-gradient-to-r
      from-green-500
      to-blue-500
      text-white
      font-bold
      text-lg
      shadow-lg
      hover:shadow-orange-500/40
      hover:scale-105
      transition-all
      duration-300
    "
  >
    ⚡ Buy Now
  </button>

</div>
     
       <div className="mt-6 flex flex-wrap gap-4 text-sm">

  <span className="bg-green-200 text-green-700 px-3 py-2 rounded-lg">
    🔒 Secure Shopping
  </span>

  <span className="bg-blue-200 text-blue-700 px-3 py-2 rounded-lg">
    🚚 Free Delivery
  </span>

  <span className="bg-yellow-200 text-yellow-900 px-3 py-2 rounded-lg">
    ↩️ 7 Days Return
  </span>

</div>
      </div>

    </div>

    {/* Review Form */}

    <div className="mt-12 bg-white rounded-xl shadow-lg p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4">
        Write Review ⭐
      </h2>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        className="border p-3 rounded-lg"
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        className="w-full border p-3 rounded-lg mt-4"
        rows="4"
      />

      <button
        onClick={submitReview}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
      >
        Submit Review
      </button>
    </div>

    {/* Reviews List */}

    <div className="mt-8 sm:mt-10">
      <h2 className="text-3xl font-bold mb-6">
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">
          No Reviews Yet
        </p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-xl shadow-md p-5 mb-4"
          >
            <h3 className="font-bold text-lg">
              {review.user.name}
            </h3>

            <p className="text-yellow-500 text-lg">
              {"⭐".repeat(review.rating)}
            </p>

            <p className="mt-2 text-gray-700">
              {review.comment}
            </p>
          </div>
        ))
      )}
    </div>
  </div>
);

}

export default ProductDetails;