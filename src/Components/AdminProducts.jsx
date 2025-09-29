import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
   const [showOrders, setShowOrders] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchProducts();
    fetchOrders(); // ✅ fixed typo
  }, []);

  // Add product
  const handleCreate = async () => {
    if (!form.name || !form.price || !form.stock || !form.category) {
      toast.error("Please fill in all required fields!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      formData.append("description", form.description);
      if (form.image) formData.append("image", form.image);

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add product");
      toast.success("Product added successfully!");
      setForm({
        name: "",
        price: "",
        stock: "",
        category: "",
        image: "",
        description: "",
      });
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted!");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  // Update product
  const handleUpdate = async (id, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error("Failed to update product");
      toast.success("Product updated!");
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5e9] flex flex-col">
      <main className="flex-1 container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Product Management
        </h1>

        {/* Form Card */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add New Product
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-orange-400"
            />
            <input
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-orange-400"
            />
            <input
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-orange-400"
            />
            <input
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) setForm({ ...form, image: file });
              }}
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              placeholder="Description"
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border border-gray-300 rounded-md p-3 w-full focus:ring-2 focus:ring-orange-400"
              rows={1}
            />
          </div>
          <button
            onClick={handleCreate}
            disabled={loading}
            className="mt-4 px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Product List
          </h2>
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-3">Name</th>
                <th className="border p-3">Price</th>
                <th className="border p-3">Stock</th>
                <th className="border p-3">Category</th>
                <th className="border p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="border p-3">
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) =>
                        setProducts(
                          products.map((prod) =>
                            prod._id === p._id
                              ? { ...prod, name: e.target.value }
                              : prod
                          )
                        )
                      }
                      className="border border-gray-300 rounded-md p-1 w-full"
                    />
                  </td>
                  <td className="border p-3">
                    <input
                      type="number"
                      value={p.price}
                      onChange={(e) =>
                        setProducts(
                          products.map((prod) =>
                            prod._id === p._id
                              ? { ...prod, price: e.target.value }
                              : prod
                          )
                        )
                      }
                      className="border border-gray-300 rounded-md p-1 w-full"
                    />
                  </td>
                  <td className="border p-3">
                    <input
                      type="number"
                      value={p.stock}
                      onChange={(e) =>
                        setProducts(
                          products.map((prod) =>
                            prod._id === p._id
                              ? { ...prod, stock: e.target.value }
                              : prod
                          )
                        )
                      }
                      className="border border-gray-300 rounded-md p-1 w-full"
                    />
                  </td>
                  <td className="border p-3">
                    <input
                      type="text"
                      value={p.category}
                      onChange={(e) =>
                        setProducts(
                          products.map((prod) =>
                            prod._id === p._id
                              ? { ...prod, category: e.target.value }
                              : prod
                          )
                        )
                      }
                      className="border border-gray-300 rounded-md p-1 w-full"
                    />
                  </td>
                  <td className="border p-3 flex gap-2">
                    <button
                      onClick={() => handleUpdate(p._id, p)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                    >
                      💾 Update
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Orders History */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center cursor-pointer"
    onClick={() => setShowOrders(!showOrders)}
          > 
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Orders History
          </h2>
          <span>
            {showOrders ? "⬆️see less" : "⬇️see more"} 
          </span>
          </div>

          {showOrders && (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border p-3">Order ID</th>
                <th className="border p-3">Name</th>
                <th className="border p-3">city</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">Amount</th>
                <th className="border p-3">Status</th>
                 <th className="border p-3">Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50">
                    <td className="border p-3">{o._id}</td>
                    <td className="border p-3">{o.shippingAddress.fullName}</td>
                    <td className="border p-3">
                      {o.shippingAddress.address}, {o.shippingAddress.city}, {o.shippingAddress.state},
                      {o.shippingAddress.country},
                    
                    </td>
                    <td className="border p-3">{o.shippingAddress.Phone}</td>
                    <td className="border p-3">₦{o.total}</td>
                    <td className="border p-3">{o.status || "Pending"}</td>
                    <td className="border p-3">
                      <ul className="list-disc pl-4">
                      {o.items.map((item) => (
                        <li key={item.productId._id}>
                          {item.productId.name} (x{item.quantity})
                        </li>
                      ))}

                      </ul>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminProducts;
