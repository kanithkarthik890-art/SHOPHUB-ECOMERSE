import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              ShopHub
            </h2>

            <p className="mt-4 text-gray-400">
              Your one-stop destination for
              mobiles, laptops, gaming,
              smartwatches and premium gadgets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2">
              <Link to="/" className="hover:text-blue-400">
                Products
              </Link>

              <Link to="/cart" className="hover:text-blue-400">
                Cart
              </Link>

              <Link to="/wishlist" className="hover:text-blue-400">
                Wishlist
              </Link>

              <Link to="/orders" className="hover:text-blue-400">
                Orders
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Support
            </h3>

            <div className="flex flex-col gap-2">
              <a href="#" className="hover:text-blue-400">
                About Us
              </a>

              <a href="#" className="hover:text-blue-400">
                Contact Us
              </a>

              <a href="#" className="hover:text-blue-400">
                Privacy Policy
              </a>

              <a href="#" className="hover:text-blue-400">
                Terms & Conditions
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Connect
            </h3>

            <div className="flex flex-col gap-2">
              <a
                href="https://github.com/Sumit-Yadav2611"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/sumit-yadav-8a8929357/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400"
              >
                LinkedIn
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400"
              >
                Instagram
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">

          © 2026 ShopHub. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;