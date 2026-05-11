import { Link, Outlet } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export default function MainLayout() {
  const cartItemsCount = useCartStore((state) => state.totalItems());

  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans">
      {/* Top Announcement Bar */}
      <div className="h-10 bg-[#8c1c1c] text-white flex items-center justify-between px-4 sm:px-10 text-[10px] uppercase tracking-[0.2em] font-bold">
        <span className="animate-pulse">🔥 MEGA SALE: UP TO 70% OFF SITEWIDE</span>
        <div className="hidden md:flex gap-6 items-center">
          <span className="cursor-pointer text-white/80">Ends in: 24h 45m</span>
          <Link to="/shop" className="cursor-pointer text-white font-black underline underline-offset-4 hover:text-white/80 transition-colors">Shop Sale Now</Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="px-4 sm:px-10">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu & Search */}
            <div className="flex items-center gap-4 lg:hidden">
              <button className="text-black">
                <Menu className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-12 lg:flex-1">
              {/* Logo */}
              <Link to="/" className="text-2xl font-bold tracking-tighter">
                VM<span className="font-light italic px-1">VIRTUAL</span>MALL
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-8. text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                <Link to="/category/new" className="text-black cursor-pointer border-b border-black pb-1 hover:text-black transition-colors">New Arrivals</Link>
                <Link to="/category/designers" className="hover:text-black cursor-pointer transition-colors">Designers</Link>
                <Link to="/category/clothing" className="hover:text-black cursor-pointer transition-colors">Collections</Link>
                <Link to="/category/accessories" className="hover:text-black cursor-pointer transition-colors">Editorial</Link>
                <Link to="/brands" className="hover:text-black cursor-pointer transition-colors">The Edit</Link>
              </nav>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <div className="hidden lg:block relative">
                <input type="text" placeholder="Search Designers..." className="bg-neutral-50 border-none px-4 py-2 text-xs w-48 focus:ring-1 focus:ring-black outline-none" />
              </div>
              <div className="flex items-center gap-4">
                <button className="lg:hidden text-black hover:text-neutral-500 transition-colors">
                  <Search className="w-5 h-5 stroke-[1.5]" />
                </button>
                <Link to="/auth/login" className="text-black hover:text-neutral-500 transition-colors">
                  <User className="w-5 h-5 stroke-[1.5]" />
                </Link>
                <Link to="/wishlist" className="text-black hover:text-neutral-500 transition-colors">
                  <Heart className="w-5 h-5 stroke-[1.5]" />
                </Link>
                <Link to="/cart" className="text-black hover:text-neutral-500 transition-colors relative">
                  <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="h-auto md:h-20 bg-white border-t border-neutral-100 flex flex-col md:flex-row items-center px-4 sm:px-10 py-4 md:py-0 gap-4 md:gap-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04c0 4.833 1.533 9.245 4.158 12.853a11.955 11.955 0 0012.92 0c2.625-3.608 4.158-8.02 4.158-12.853z"></path></svg>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold">100% Authenticity Guaranteed</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold">Next Day Concierge Delivery</span>
        </div>
        <div className="flex items-center gap-3 md:ml-auto">
           <span className="text-[10px] text-neutral-400 font-medium uppercase">Over 450+ Luxury Designers Verified</span>
        </div>
      </footer>
    </div>
  );
}
