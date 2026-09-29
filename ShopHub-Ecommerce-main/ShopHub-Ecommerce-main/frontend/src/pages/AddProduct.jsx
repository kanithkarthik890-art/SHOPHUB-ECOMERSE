import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });

  const [uploading, setUploading] =
  useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  const data = new FormData();

  data.append("image", file);

  try {
    setUploading(true);

    const res = await api.post(
      "/upload",
      data
    );

    setFormData((prev) => ({
      ...prev,
      image: res.data.imageUrl,
    }));

    setUploading(false);
  } catch (error) {
    console.log(error);
    setUploading(false);

    toast.error("Image Upload Failed ❌");
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/products",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Added Successfully ✅");

      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("Failed To Create Product ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-8">
          Add Product
        </h1>

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full h-64 object-cover rounded-xl mb-6"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block font-medium mb-2">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Description
            </label>

            <input
              type="text"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Price
            </label>

            <input
              type="number"
              name="price"
              placeholder="Enter price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">
                Select Category
              </option>

              <option value="Mobile">
                 📱 Mobile
               </option>
                     
               <option value="Laptop">
                 💻 Laptop
               </option>
                     
               <option value="Earbuds">
                 🎧 Earbuds
               </option>
                     
               <option value="Smartwatch">
                 ⌚ Smartwatch
               </option>
                     
               <option value="Gaming">
                 🎮 Gaming
               </option>
                     
               <option value="Camera">
                 📷 Camera
               </option>
               <option value="Tablet">
                 📱 Tablet
               </option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              placeholder="Enter stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Upload Product Image
            </label>
                
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
          {uploading && (
            <p className="text-blue-600 font-medium">
              Uploading Image...
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;