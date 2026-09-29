import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";


function Navbar() {
  
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
   
 

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
  fetchWishlistCount();
  fetchCartCount();
}, []);

const fetchWishlistCount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await api.get("/wishlist", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setWishlistCount(res.data.items.length);
  } catch (error) {
    console.log(error);
  }
};

    const fetchCartCount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await api.get("/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setCartCount(res.data.cartItems.length);
  } catch (error) {
    console.log(error);
  }
};

return (
  <nav className="bg-white shadow sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

      <Link
        to="/"
        className="
            text-2xl
            font-extrabold
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            bg-clip-text
            text-transparent
            "
      >
        ShopHub
      </Link>

      {/* Mobile Menu Button */}
      <button
        className="
           md:hidden
           text-3xl
           font-bold
           hover:scale-110
           transition
           "
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          ></div>

          <div className="fixed top-0 right-0 h-screen w-72 bg-white shadow-2xl p-6 flex flex-col gap-6 z-50 md:hidden">

            <div className="flex justify-between items-center border-b pb-4">
              <h2 className="text-2xl font-bold text-blue-600">
                ShopHub
              </h2>

              <button
                onClick={() => setMenuOpen(false)}
                className="text-3xl"
              >
                ✕
              </button>
            </div>
           
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:text-blue-600"
            >
              Products
            </Link>

            {token && (
              <>
                <Link
                  to="/cart"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg hover:text-blue-600"
                >
                  Cart 🛒 ({cartCount})
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg hover:text-blue-600"
                >
                  Wishlist ❤️ ({wishlistCount})
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg hover:text-blue-600"
                >
                  Orders
                </Link>
              </>
            )}

            {!token && (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg hover:text-blue-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="text-lg hover:text-blue-600"
                >
                  Register
                </Link>
              </>
            )}

            {role === "admin" && (
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="text-lg hover:text-blue-600"
              >
                Admin
              </Link>
            )}

            {token && (
              <button
                onClick={handleLogout}
                className="text-left text-red-500 text-lg font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </>
      )}

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center font-medium">
     
        <Link
          to="/"
          className="hover:text-blue-600"
        >
          Products
        </Link>

        {!token && (
          <>
            <Link
              to="/login"
              className="hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-blue-600"
            >
              Register
            </Link>
            <Link
                to="/profile"
                className="hover:text-blue-600"
                >
                Profile
            </Link>
          </>
        )}

        {token && (
          <>
            <Link to="/cart">
              Cart 🛒
            </Link>

            <Link to="/wishlist">
               Wishlist ❤️
             </Link>

            <Link
              to="/orders"
              className="hover:text-blue-600"
            >
              Orders
            </Link>
          </>
        )}

        {role === "admin" && (
          <Link
            to="/admin"
            className="hover:text-blue-600"
          >
            Admin
          </Link>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        )}
      </div>

    </div>
  </nav>
);
}

export default Navbar;