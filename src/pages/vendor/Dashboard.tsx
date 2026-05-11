import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useAuthStore } from "../../store/useAuthStore";
import { DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";

export default function VendorDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    revenue: 0,
  });

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      try {
        const prodQ = query(collection(db, "products"), where("vendorId", "==", user.uid));
        const prodSnapshot = await getDocs(prodQ);
        const productsCount = prodSnapshot.size;

        // Simplified for mock without complex query
        setStats({
           products: productsCount,
           orders: 12,
           revenue: 4500,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-light italic leading-tight tracking-tight mb-8">Vendor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-8 border border-neutral-100 shadow-sm relative overflow-hidden group">
           <div className="flex justify-between items-start mb-6">
              <div className="text-neutral-400"><DollarSign className="w-5 h-5 stroke-[1.5]" /></div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-green-600 bg-green-50 px-3 py-1 flex items-center gap-2"><TrendingUp className="w-3 h-3"/> +12%</span>
           </div>
           <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Total Revenue</p>
           <h3 className="text-4xl font-light italic">${stats.revenue.toLocaleString()}</h3>
        </div>
        <div className="bg-white p-8 border border-neutral-100 shadow-sm relative overflow-hidden group">
           <div className="flex justify-between items-start mb-6">
              <div className="text-neutral-400"><ShoppingBag className="w-5 h-5 stroke-[1.5]" /></div>
           </div>
           <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Total Orders</p>
           <h3 className="text-4xl font-light">{stats.orders}</h3>
        </div>
        <div className="bg-white p-8 border border-neutral-100 shadow-sm relative overflow-hidden group">
           <div className="flex justify-between items-start mb-6">
              <div className="text-neutral-400"><Package className="w-5 h-5 stroke-[1.5]" /></div>
           </div>
           <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Active Products</p>
           <h3 className="text-4xl font-light">{stats.products}</h3>
        </div>
      </div>

      <div className="bg-white border border-neutral-100 p-8 shadow-sm">
         <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">Recent Orders</h2>
         <div className="text-xs font-medium text-neutral-500 uppercase tracking-widest py-8 text-center">
            No recent orders.
         </div>
      </div>
    </div>
  );
}
