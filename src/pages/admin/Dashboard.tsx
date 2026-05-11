import React, { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Check, X, Shield, Users } from "lucide-react";

interface VendorInfo {
  id: string;
  name: string;
  email: string;
  role: string;
  isApproved: boolean;
  createdAt?: any;
}

export default function AdminDashboard() {
  const [pendingVendors, setPendingVendors] = useState<VendorInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingVendors = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "users"),
        where("role", "==", "vendor"),
        where("isApproved", "==", false)
      );
      const querySnapshot = await getDocs(q);
      const vendors: VendorInfo[] = [];
      querySnapshot.forEach((doc) => {
        vendors.push({ id: doc.id, ...doc.data() } as VendorInfo);
      });
      setPendingVendors(vendors);
    } catch (error) {
      console.error("Error fetching pending vendors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingVendors();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { isApproved: true });
      setPendingVendors(pendingVendors.filter(v => v.id !== id));
    } catch (error) {
       console.error("Failed to approve vendor:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const userRef = doc(db, "users", id);
      await updateDoc(userRef, { role: "customer" });
      setPendingVendors(pendingVendors.filter(v => v.id !== id));
    } catch (error) {
      console.error("Failed to reject vendor:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-light italic leading-tight tracking-tight mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-8 border border-neutral-100 shadow-sm relative overflow-hidden group">
           <div className="flex justify-between items-start mb-6">
              <div className="text-neutral-400"><Shield className="w-5 h-5 stroke-[1.5]" /></div>
           </div>
           <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">Pending Approvals</p>
           <h3 className="text-4xl font-light italic">{pendingVendors.length}</h3>
        </div>
        <div className="bg-white p-8 border border-neutral-100 shadow-sm relative overflow-hidden group">
           <div className="flex justify-between items-start mb-6">
              <div className="text-neutral-400"><Users className="w-5 h-5 stroke-[1.5]" /></div>
           </div>
           <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-2">System Status</p>
           <h3 className="text-2xl font-light text-green-500">Operational</h3>
        </div>
      </div>

      <div className="bg-white border border-neutral-100 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-neutral-100 flex justify-between items-center">
            <h2 className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-900">Vendor Approvals</h2>
         </div>
         <table className="w-full text-left text-sm">
            <thead className="bg-neutral-50 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-100">
               <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
               {loading ? (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-neutral-400 uppercase tracking-widest text-[10px] font-bold">Loading requests...</td></tr>
               ) : pendingVendors.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-neutral-400 uppercase tracking-widest text-[10px] font-bold">No pending vendor requests.</td></tr>
               ) : (
                  pendingVendors.map(vendor => (
                     <tr key={vendor.id} className="hover:bg-neutral-50 transition-colors">
                        <td className="px-6 py-4">
                           <p className="text-xs font-bold uppercase tracking-tighter text-black">{vendor.name}</p>
                        </td>
                        <td className="px-6 py-4 text-neutral-500 font-serif italic">{vendor.email}</td>
                        <td className="px-6 py-4 text-center">
                           <span className="px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-none bg-yellow-50 text-yellow-700 border border-yellow-200">
                              PENDING
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button 
                              onClick={() => handleApprove(vendor.id)}
                              className="text-green-600 hover:text-green-800 text-[10px] font-bold uppercase tracking-widest mr-4 transition-colors"
                           >
                              Approve
                           </button>
                           <button 
                              onClick={() => handleReject(vendor.id)}
                              className="text-red-500 hover:text-red-700 text-[10px] font-bold uppercase tracking-widest transition-colors"
                           >
                              Reject
                           </button>
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
