/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./lib/firebase";
import { useAuthStore } from "./store/useAuthStore";

import MainLayout from "./components/layout/MainLayout";
import VendorLayout from "./components/layout/VendorLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProducts from "./pages/vendor/Products";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";

export default function App() {
  const { setUser, setLoading, user, userRole, isLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user role
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
             const data = userDoc.data();
             setUser(user, data.role as "customer" | "vendor" | "admin", data.isApproved);
          } else {
             setUser(user, "customer", true);
          }
        } catch (error) {
          console.error("Error fetching user role", error);
          setUser(user, "customer", true);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans text-black bg-white">
        <div className="text-2xl font-bold tracking-tighter uppercase mb-6 animate-pulse">
          VM<span className="font-light italic px-1">VIRTUAL</span>MALL
        </div>
        <div className="w-48 h-[1px] bg-neutral-100 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-black animate-slide" />
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="category/:categoryName" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        
        {/* Vendor Routes */}
        <Route path="/vendor" element={userRole === "vendor" ? <VendorLayout /> : <Navigate to="/auth/login" />}>
           <Route index element={<VendorDashboard />} />
           <Route path="products" element={<VendorProducts />} />
           <Route path="*" element={<div className="p-8">Coming Soon</div>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={userRole === "admin" ? <AdminLayout /> : <Navigate to="/auth/login" />}>
           <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="/auth/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/auth/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}
