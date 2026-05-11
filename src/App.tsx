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
// import AdminDashboard from "./pages/admin/Dashboard";

export default function App() {
  const { setUser, setLoading, user, userRole, isLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user role
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          const role = userDoc.exists() ? (userDoc.data().role as "customer" | "vendor" | "admin") : "customer";
          setUser(user, role);
        } catch (error) {
          console.error("Error fetching user role", error);
          setUser(user, "customer");
        }
      } else {
        setUser(null, null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center font-serif text-xl">Loading VM Mall...</div>;
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

        <Route path="/auth/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/auth/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}
