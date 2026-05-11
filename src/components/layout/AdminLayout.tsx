import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { LayoutDashboard, Users, UserCheck, ShoppingBag, Settings, LogOut } from "lucide-react";
import { auth } from "../../lib/firebase";

export default function AdminLayout() {
  const { user, userRole } = useAuthStore();
  const navigate = useNavigate();

  if (!user || userRole !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Unauthorized. Only administrators can access this page.</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex font-sans text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-100 hidden md:flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-neutral-100 px-6">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase">VM<span className="font-light italic px-1">ADMIN</span></Link>
        </div>
        <nav className="p-4 space-y-2 flex-1">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors">
            <UserCheck className="w-4 h-4" />
            Vendor Approvals
          </Link>
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors">
            <Users className="w-4 h-4" />
            Users
          </Link>
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors">
            <ShoppingBag className="w-4 h-4" />
            All Orders
          </Link>
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest font-bold hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-neutral-100">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-[11px] uppercase tracking-widest font-bold text-red-500 hover:text-red-700 hover:bg-red-50 w-full transition-colors">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-neutral-100 flex items-center justify-end px-8">
           <div className="flex items-center gap-4">
              <span className="text-[11px] uppercase tracking-widest font-bold text-neutral-500">{user.displayName || user.email}</span>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-xs font-bold uppercase text-white">
                {user.email?.[0] || 'A'}
              </div>
           </div>
        </header>
        <div className="p-8 flex-1 overflow-auto bg-neutral-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
}