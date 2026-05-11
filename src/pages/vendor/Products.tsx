import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../lib/firebase";
import { useAuthStore } from "../../store/useAuthStore";
import { Plus } from "lucide-react";

export default function VendorProducts() {
  const { user } = useAuthStore();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    images: "",
  });

  const fetchProducts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const q = query(collection(db, "products"), where("vendorId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, "products"), {
        vendorId: user.uid,
        title: newProduct.title,
        description: newProduct.description,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        status: "active", // In a real app, this might be 'pending' for admin approval
        images: newProduct.images.split(",").map(url => url.trim()),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setIsAdding(false);
      setNewProduct({ title: "", description: "", price: "", stock: "", images: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to add product. Check permissions.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 border-b border-neutral-100 pb-4">
         <h1 className="text-3xl font-light italic leading-tight tracking-tight">Products</h1>
         <button 
           onClick={() => setIsAdding(!isAdding)}
           className="bg-black text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity"
         >
           <Plus className="w-4 h-4 stroke-[1.5]" /> Add Product
         </button>
      </div>

      {isAdding && (
         <div className="bg-white p-8 border border-neutral-100 shadow-sm mb-8">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-6">
               <div>
                 <label className="block text-[10px] font-bold text-neutral-900 uppercase tracking-[0.2em] mb-2">Title</label>
                 <input type="text" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full border border-neutral-200 p-3 text-xs focus:outline-none focus:border-black transition-colors" />
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-neutral-900 uppercase tracking-[0.2em] mb-2">Description</label>
                 <textarea required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full border border-neutral-200 p-3 text-xs focus:outline-none focus:border-black transition-colors" rows={3}></textarea>
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-[10px] font-bold text-neutral-900 uppercase tracking-[0.2em] mb-2">Price ($)</label>
                   <input type="number" required min="0" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full border border-neutral-200 p-3 text-xs focus:outline-none focus:border-black transition-colors" />
                 </div>
                 <div>
                   <label className="block text-[10px] font-bold text-neutral-900 uppercase tracking-[0.2em] mb-2">Stock</label>
                   <input type="number" required min="0" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="w-full border border-neutral-200 p-3 text-xs focus:outline-none focus:border-black transition-colors" />
                 </div>
               </div>
               <div>
                 <label className="block text-[10px] font-bold text-neutral-900 uppercase tracking-[0.2em] mb-2">Image URLs (comma separated)</label>
                 <input type="text" required value={newProduct.images} onChange={e => setNewProduct({...newProduct, images: e.target.value})} className="w-full border border-neutral-200 p-3 text-xs focus:outline-none focus:border-black placeholder-neutral-300 transition-colors" placeholder="https://..." />
               </div>
               <div className="flex gap-4 pt-6 border-t border-neutral-100">
                  <button type="submit" className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">Save Product</button>
                  <button type="button" onClick={() => setIsAdding(false)} className="px-8 py-3 text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-black border border-neutral-200 hover:border-black transition-colors">Cancel</button>
               </div>
            </form>
         </div>
      )}

      <div className="bg-white border border-neutral-100 shadow-sm overflow-hidden">
         <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-100">
               <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
               {loading ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Loading products...</td></tr>
               ) : products.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-neutral-400 uppercase tracking-widest text-[10px] font-bold">No products found. Create one.</td></tr>
               ) : (
                  products.map(product => (
                     <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-4">
                           <div className="w-12 h-16 bg-neutral-100 overflow-hidden">
                              {product.images?.[0] && <img src={product.images[0]} alt="" className="w-full h-full object-cover" />}
                           </div>
                           <div>
                              <p className="text-xs font-bold uppercase tracking-tighter text-black">{product.title}</p>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-neutral-500 font-serif italic">${product.price}</td>
                        <td className="px-6 py-4 text-neutral-500 text-xs font-medium">{product.stock}</td>
                        <td className="px-6 py-4">
                           <span className={`px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-none ${product.status === 'active' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-yellow-50 text-yellow-700 border border-yellow-200'}`}>
                              {product.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-black hover:text-neutral-500 text-[10px] font-bold uppercase tracking-widest mr-4 transition-colors">Edit</button>
                           <button className="text-red-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-widest transition-colors">Delete</button>
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
