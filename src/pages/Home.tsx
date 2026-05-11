import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">
      {/* Sale Banners Grid Section */}
      <section className="w-full bg-white h-auto md:h-[85vh] flex flex-col md:flex-row gap-4 p-4 sm:px-10 pb-12">
        {/* Left Large Sale Banner */}
        <Link to="/category/women" className="relative flex-1 bg-neutral-100 overflow-hidden group min-h-[400px] md:min-h-full">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Women's Sale" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end text-white">
             <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold mb-3 text-red-500 bg-red-100/10 w-fit px-3 py-1 border border-red-500/30">End of Season</p>
             <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-2">Mega<br/>Sale</h2>
             <p className="text-xl md:text-2xl font-light italic mb-8">Up to 70% Off selected styles</p>
             <span className="inline-block border border-white bg-white text-black px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold w-fit hover:bg-black hover:text-white border-transparent hover:border-black transition-colors">Shop Women</span>
          </div>
        </Link>
        
        {/* Right Stack */}
        <div className="flex-1 flex flex-col gap-4">
           {/* Top Right Sale Banner */}
           <Link to="/category/men" className="relative flex-1 bg-neutral-100 overflow-hidden group min-h-[250px]">
              <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 transform object-top" alt="Men's Sale" />
              <div className="absolute inset-0 bg-black/30 z-10 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-center items-center text-white text-center">
                 <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-2">Menswear</h3>
                 <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-6 text-red-400">Further Reductions</p>
                 <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold border-b border-white pb-1 group-hover:text-black group-hover:bg-white group-hover:border-transparent group-hover:px-4 group-hover:py-2 transition-all">Shop Men</span>
              </div>
           </Link>
           {/* Bottom Right Sale Banner */}
           <Link to="/category/accessories" className="relative flex-1 bg-neutral-100 overflow-hidden group min-h-[250px]">
              <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2187&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Accessories Sale" />
              <div className="absolute inset-0 bg-black/20 z-10 transition-colors group-hover:bg-black/40" />
              <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end items-start text-white">
                 <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-1">Accessories</h3>
                 <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Extra 20% Off at Checkout</p>
                 <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold border-b border-white pb-1 w-fit group-hover:text-black group-hover:bg-white group-hover:border-transparent group-hover:px-4 group-hover:py-2 transition-all">Shop Accessories</span>
              </div>
           </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="px-4 sm:px-10 py-24">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400">Shop by Category</h2>
          <Link to="/categories" className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 hover:text-neutral-500 transition-colors">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1983&auto=format&fit=crop" },
            { title: "Bags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=1915&auto=format&fit=crop" },
            { title: "Shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000&auto=format&fit=crop" }
          ].map((cat) => (
            <Link key={cat.title} to={`/category/${cat.title.toLowerCase()}`} className="group block relative h-[500px] overflow-hidden bg-neutral-100">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute bottom-8 left-8 text-white">
                <h3 className="font-serif text-2xl font-bold mb-2">{cat.title}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest border-b border-white pb-1 group-hover:text-black group-hover:bg-white group-hover:px-2 group-hover:py-1 group-hover:border-transparent transition-all">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending / New Arrivals (Grid) */}
      <section className="bg-neutral-50 py-24 px-4 sm:px-10">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400">New Arrivals</h2>
          <Link to="/shop" className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest underline underline-offset-4 hover:text-neutral-500 transition-colors">
            View All Arrivals
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="group cursor-pointer flex flex-col">
              <div className="relative aspect-[3/4] bg-white mb-2 shadow-sm overflow-hidden">
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden lg:flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0">
                    Quick Add
                  </button>
                </div>
                <img 
                  src={`https://images.unsplash.com/photo-1596207869680-77a83d690a78?q=80&w=1500&auto=format&fit=crop`} 
                  alt="Product placeholder"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <button className="absolute top-4 right-4 z-20 text-neutral-400 hover:text-black">
                   <svg className="w-5 h-5 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                </button>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-tighter truncate mt-2">Structured Wool Coat</p>
              <p className="text-[10px] text-neutral-500 font-serif italic">$1,250</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Boutique / Vendor */}
      <section className="py-24 border-t border-neutral-100">
        <div className="px-4 sm:px-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
               <img src="https://images.unsplash.com/photo-1550614000-4b95d4ebf519?q=80&w=2000&auto=format&fit=crop" alt="Boutique" className="w-full aspect-[4/5] object-cover" />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-400 mb-6">Featured Vendor</h4>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center font-bold text-sm uppercase">ML</div>
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-tighter">Maison de Luxe</h2>
                  <p className="text-xs text-neutral-400">Haute Couture • Paris</p>
                </div>
              </div>
              <p className="text-neutral-500 text-sm font-light leading-relaxed mb-8 max-w-md">
                Explore the exclusive collection from one of our premier boutique partners. Crafted with exceptional attention to detail and uncompromising quality.
              </p>
              <Link to="/vendor/maison-de-luxe" className="text-[11px] font-bold uppercase tracking-widest px-8 py-3 border border-neutral-200 rounded-full hover:bg-black hover:text-white transition-all">
                Follow Boutique
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
