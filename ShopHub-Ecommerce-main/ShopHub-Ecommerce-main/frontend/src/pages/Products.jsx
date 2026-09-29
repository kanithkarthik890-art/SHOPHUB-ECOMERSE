import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import HeroCarousel from "../components/HeroCarousel";

function Products() {
 const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [featuredProducts, setFeaturedProducts] = useState([]);
const [search, setSearch] = useState("");
const [showSuggestions, setShowSuggestions] =
  useState(false);
const [category, setCategory] = useState("All");
const [sortBy, setSortBy] = useState("");
  const suggestions = products.filter(
  (product) =>
    search &&
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.products);
      setFeaturedProducts(
        res.data.products.slice(0, 8)
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

const addToWishlist = async (productId) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login First 🔐");
      return;
    }

    await api.post(
      "/wishlist",
      {
        product: productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Added To Wishlist ❤️");
    fetchProducts();
  } catch (error) {
    console.log(error);
    toast.error("Failed To Add Wishlist");
  }
};

  return (
    
    <div className="max-w-7xl mx-auto px-6 py-8">
    <HeroCarousel />

     
       <h1
          id="products"
          className="text-4xl font-bold mb-8"
        >
          Latest Products
        </h1>

      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">
          🏆 Top Rated Products
        </h2>
      
        <div className="flex gap-4 overflow-x-auto">
          {products
            .filter(
              (product) =>
                product.rating > 0
            )
            .sort(
              (a, b) =>
                b.rating - a.rating
            )
            .slice(0, 3)
            .map((product) => (
              <div
                key={product._id}
                className="min-w-[250px] bg-yellow-50 border rounded-xl p-4"
              >
                <h3 className="font-bold">
                  {product.name}
                </h3>
      
                <p className="text-green-600 font-semibold">
                  {product.rating?.toFixed(1)} ★
                </p>
      
                <p className="text-sm text-gray-500">
                  {product.numReviews} Reviews
                </p>
              </div>
            ))}
        </div>
      </div>

     <div id="featured" className="mb-10">
       <h2 className="text-3xl font-bold mb-6">
         🔥 Featured Products
       </h2>
                
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {featuredProducts.map((product) => (
           <div
             key={product._id}
             className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
           >
             <img
               src={product.image}
               alt={product.name}
               className="w-full h-48 object-cover"
             />
      
             <div className="p-4">
               <h3 className="font-bold text-lg">
                 {product.name}
               </h3>
          
               <p className="text-blue-600 font-bold mt-2">
                 ₹ {product.price}
               </p>
          
               <div className="mt-2 flex items-center gap-2">
                 <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                   {product.rating?.toFixed(1)} ★
                 </span>
          
                 <span className="text-gray-500 text-sm">
                   ({product.numReviews})
                 </span>
               </div>
          
               <Link
                 to={`/products/${product._id}`}
               >
                 <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                   View Product
                 </button>
               </Link>
             </div>
           </div>
         ))}
       </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden mb-10">

        <img
          src="https://res.cloudinary.com/dif0ubomz/image/upload/v1781258830/banner2_kokqjx.png"
          alt="Headphones"
          className="w-full h-[250px] md:h-[450px] object-cover"
        />
      
        <div className="absolute inset-0 bg-black/30 flex items-center">

  <div className="px-5 sm:px-8 md:px-12 lg:px-16 max-w-xl text-white">

    <span className="inline-block bg-blue-600 px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4">
      🚀 New Arrivals 2026
    </span>

    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
      Premium Audio
      <br />
      Experience
    </h1>

    <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-100">
      Discover the latest headphones, earbuds,
      smart devices and premium electronics
      at unbeatable prices.
    </p>

    <div className="mt-6 flex flex-wrap gap-4">

      <button
        onClick={() =>
          document
            .getElementById("products")
            ?.scrollIntoView({
              behavior: "smooth",
            })
        }
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold shadow-xl hover:scale-105 transition-all duration-300"
      >
        Shop Now →
      </button>

      <button
        onClick={() =>
          document
            .getElementById("featured")
            ?.scrollIntoView({
              behavior: "smooth",
            })
        }
        className="backdrop-blur-md bg-white/10 border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition-all duration-300"
      >
        Explore Products
      </button>

    </div>

  </div>

</div>
            
      </div>

        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Search Laptop, Samsung, Earbuds..."
          
            value={search}
          
            onChange={(e) => {
          
              setSearch(e.target.value);
          
              setShowSuggestions(true);
          
            }}
          
            onBlur={() => {
          
              setTimeout(() => {
          
                setShowSuggestions(false);
          
              }, 200);
          
            }}
          
            onFocus={() => {
          
              setShowSuggestions(true);
          
            }}
          
            className="
              w-full
              p-4
              pl-6
              rounded-2xl
              border
              border-gray-200
              shadow-md
              text-lg
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:border-blue-500
              transition-all
            "
          />
        
          {showSuggestions &&
            search &&
            suggestions.length > 0  && (
              <div
                className="
                  absolute
                  z-50
                  bg-white
                  w-full
                  shadow-2xl
                  rounded-2xl
                  mt-3
                  border
                  border-gray-100
                  overflow-hidden
                "
              >   
                {suggestions
                  .slice(0, 5)
                  .map((product) => (
                    <div
                      key={product._id}
                      onClick={() => {
                        setSearch(product.name);
                        setShowSuggestions(false);
                      }}
                      className="
                      p-4
                      cursor-pointer
                      hover:bg-blue-50
                      border-b
                      transition-all
                      duration-200
                      "
                    >
                      {product.name}
                    </div>
                  ))}
        
              </div>
          )}
        </div>

        
       <div className="flex flex-wrap gap-3 mb-8">

            <button
              onClick={() => setCategory("All")}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              All
            </button>

            <button
              onClick={() => setCategory("Mobile")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              📱 Mobile
            </button>

            <button
              onClick={() => setCategory("Laptop")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              💻 Laptop
            </button>

            <button
              onClick={() => setCategory("Earbuds")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              🎧 Earbuds
            </button>

            <button
              onClick={() => setCategory("Smartwatch")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              ⌚ Smartwatch
            </button>

            <button
              onClick={() => setCategory("Gaming")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              🎮 Gaming
            </button>

            <button
              onClick={() => setCategory("Camera")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              📷 Camera
            </button>

            <button
              onClick={() => setCategory("Tablet")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              📱 Tablet
            </button>    
            
            <button
              onClick={() => setCategory("TV")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              📺 TV
            </button>
                    
            <button
              onClick={() => setCategory("Monitor")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              🖥️ Monitor
            </button>
                    
            <button
              onClick={() => setCategory("PC")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              ⚙️ PC
            </button>
                    
            <button
              onClick={() => setCategory("Keyboard")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              ⌨️ Keyboard
            </button>
                    
            <button
              onClick={() => setCategory("Mouse")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              🖱️ Mouse
            </button>
                    
            <button
              onClick={() => setCategory("Speaker")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              🔊 Speaker
            </button>
                    
            <button
              onClick={() => setCategory("Printer")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              🖨️ Printer
            </button>
                    
            <button
              onClick={() => setCategory("Router")}
              className="px-5 py-2 bg-gray-200 rounded-lg"
            >
              📡 Router
            </button>
      
     </div>

        <div className="mb-6">
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              Sort Products
            </option>
          
            <option value="rating">
              Highest Rated
            </option>
          
            <option value="priceLow">
              Price: Low To High
            </option>
          
            <option value="priceHigh">
              Price: High To Low
            </option>
          </select>
        </div>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
            .filter((product) =>
              product.name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .filter((product) =>
               category === "All"
                 ? true
                 : product.category === category
             )
             .sort((a, b) => {
               if (sortBy === "rating") {
                 return b.rating - a.rating;
               }
             
               if (sortBy === "priceLow") {
                 return a.price - b.price;
               }
             
               if (sortBy === "priceHigh") {
                 return b.price - a.price;
               }
             
               return 0;
             })
             .map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
          >
            <div className="h-52 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={
                  product.image ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x400?text=No+Image";
                }}
              />
            </div>

            <div className="p-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => addToWishlist(product._id)}
                  className="text-2xl hover:scale-125 transition"
                >
                  ❤️
                </button>
              </div>
              <h2 className="text-lg font-semibold">
                {product.name}
              </h2>

              <p className="text-gray-600 mt-2 line-clamp-2">
                {product.description}
              </p>

              <p className="text-2xl font-bold text-blue-600 mt-3">
                ₹ {product.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Stock: {product.stock}
              </p>

              <div className="mt-2 flex items-center gap-2">

                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  {product.rating?.toFixed(1)} ★
                </span>

                <span className="text-gray-500 text-sm">
                  ({product.numReviews} Reviews)
                </span>

              </div>

              <Link to={`/products/${product._id}`}>
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    
  
  );
}

export default Products;