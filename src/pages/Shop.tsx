import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useCartStore } from "../store/useCartStore";
import { Heart, Search } from "lucide-react";

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("status", "==", "active"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // Put placeholder items if none exist
        if (data.length === 0) {
          setProducts([
            { id: "1", title: "Silk Evening Gown", price: 1200, images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop"] },
            { id: "2", title: "Structured Leather Tote", price: 850, images: ["https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop"] },
            { id: "3", title: "Minimalist Watch", price: 450, images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"] },
          ]);
        } else {
          setProducts(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: any) => {
    addItem({
      productId: product.id,
      vendorId: product.vendorId || "unknown",
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.images?.[0] || product.image || "",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10 py-12">
      <div className="border-b border-neutral-100 pb-8 flex flex-col md:flex-row justify-between items-baseline mb-8">
        <h1 className="text-3xl font-light italic leading-tight tracking-tight mb-4 md:mb-0">The Collection</h1>
        <div className="flex items-center gap-4 text-sm w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <input type="text" placeholder="Search..." className="w-full border-b border-neutral-200 py-2 pl-8 pr-4 text-xs font-medium focus:outline-none focus:border-black transition-colors" />
            <Search className="w-4 h-4 absolute left-2 top-3 text-neutral-400" />
          </div>
          <select className="border border-neutral-200 py-2 px-4 focus:outline-none cursor-pointer uppercase tracking-widest text-[10px] font-bold">
             <option>Sort By: Newest</option>
             <option>Price: Low to High</option>
             <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-12">
        {/* Filters Sidebar */}
        <aside className="hidden lg:block w-48 flex-shrink-0">
          <div className="space-y-10">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 mb-4 border-b border-neutral-100 pb-2">Categories</h3>
              <ul className="space-y-3 text-[11px] font-medium text-neutral-500 uppercase tracking-widest">
                <li className="hover:text-black cursor-pointer transition-colors">Dresses</li>
                <li className="hover:text-black cursor-pointer transition-colors">Tops</li>
                <li className="hover:text-black cursor-pointer transition-colors">Bottoms</li>
                <li className="hover:text-black cursor-pointer transition-colors">Accessories</li>
                <li className="hover:text-black cursor-pointer transition-colors">Bags</li>
                <li className="hover:text-black cursor-pointer transition-colors">Shoes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 mb-4 border-b border-neutral-100 pb-2">Designers</h3>
              <ul className="space-y-3 text-[11px] font-medium text-neutral-500 uppercase tracking-widest">
                <li className="hover:text-black cursor-pointer transition-colors">Chanel</li>
                <li className="hover:text-black cursor-pointer transition-colors">Dior</li>
                <li className="hover:text-black cursor-pointer transition-colors">Gucci</li>
                <li className="hover:text-black cursor-pointer transition-colors">Prada</li>
              </ul>
            </div>
            <div>
               <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 mb-4 border-b border-neutral-100 pb-2">Price</h3>
               <div className="flex items-center gap-2">
                 <input type="number" placeholder="Min" className="w-full border border-neutral-200 p-2 text-xs focus:outline-none focus:border-black" />
                 <span className="text-neutral-400">-</span>
                 <input type="number" placeholder="Max" className="w-full border border-neutral-200 p-2 text-xs focus:outline-none focus:border-black" />
               </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                   <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 aspect-[3/4] mb-4"></div>
                      <div className="h-4 bg-gray-200 w-2/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 w-1/3"></div>
                   </div>
                ))}
             </div>
           ) : (
             <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
               {products.map((product) => (
                 <div key={product.id} className="group cursor-pointer flex flex-col">
                   <div className="relative aspect-[3/4] bg-white mb-2 shadow-sm overflow-hidden">
                     <img 
                       src={product.images?.[0] || product.image} 
                       alt={product.title}
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                     <button className="absolute top-3 right-3 z-20 text-neutral-400 hover:text-black bg-white/50 backdrop-blur-sm p-2 rounded-full transition-colors">
                       <Heart className="w-4 h-4 stroke-[1.5]" />
                     </button>
                     <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden lg:flex items-center justify-center">
                        <button 
                          onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                          className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all hover:bg-black hover:text-white"
                        >
                          Quick Add
                        </button>
                     </div>
                   </div>
                   <div className="flex flex-col flex-1 mt-2">
                      <Link to={`/product/${product.id}`} className="text-[10px] font-bold uppercase tracking-tighter truncate text-black mb-1 hover:underline">
                        {product.title}
                      </Link>
                      <p className="text-[10px] text-neutral-500 font-serif italic">${product.price}</p>
                   </div>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
