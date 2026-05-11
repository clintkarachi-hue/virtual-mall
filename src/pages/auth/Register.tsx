import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"customer" | "vendor">("customer");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      await updateProfile(user, { displayName: name });

      // Save user to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role,
        createdAt: serverTimestamp(),
        // Additional fields can be added depending on role (e.g. approval status for vendor)
        ...(role === "vendor" ? { isApproved: false } : {})
      });

      navigate("/");
    } catch (err: any) {
      setError(err.message || "Failed to register.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white p-10 border border-neutral-100 shadow-sm">
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-2xl font-bold tracking-tighter text-black uppercase">
              VM<span className="font-light italic px-1">VIRTUAL</span>MALL
            </h1>
          </Link>
          <h2 className="text-2xl font-light italic tracking-tight text-black mb-2">Create an Account</h2>
          <p className="text-[11px] uppercase tracking-widest text-neutral-400 font-bold">Join the exclusive marketplace</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-xs border border-red-100 uppercase tracking-widest font-bold">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="grid grid-cols-2 gap-4 mb-6 relative">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`py-3 text-[10px] font-bold uppercase tracking-[0.2em] border transition-colors ${role === "customer" ? "bg-black text-white border-black" : "bg-transparent text-neutral-500 border-neutral-200 hover:border-black"}`}
            >
              Customer
            </button>
            <button
              type="button"
              onClick={() => setRole("vendor")}
              className={`py-3 text-[10px] font-bold uppercase tracking-[0.2em] border transition-colors ${role === "vendor" ? "bg-black text-white border-black" : "bg-transparent text-neutral-500 border-neutral-200 hover:border-black"}`}
            >
              Vendor
            </button>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-neutral-900 uppercase tracking-[0.2em] mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="appearance-none block w-full px-4 py-3 border border-neutral-200 placeholder-neutral-400 text-xs focus:outline-none focus:border-black transition-colors"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-neutral-900 uppercase tracking-[0.2em] mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              className="appearance-none block w-full px-4 py-3 border border-neutral-200 placeholder-neutral-400 text-xs focus:outline-none focus:border-black transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-neutral-900 uppercase tracking-[0.2em] mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="appearance-none block w-full px-4 py-3 border border-neutral-200 placeholder-neutral-400 text-xs focus:outline-none focus:border-black transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-4 px-4 bg-black text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:opacity-80 focus:outline-none disabled:bg-neutral-400 transition-opacity"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        <div className="mt-10 text-center text-[10px] text-neutral-500 uppercase tracking-widest font-bold">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-black border-b border-black pb-0.5 ml-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
