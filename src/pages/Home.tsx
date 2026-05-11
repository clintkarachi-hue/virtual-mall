import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">
      {/* Sale Banners Grid Section */}
      <section className="w-full bg-white p-4 sm:px-10 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-auto md:h-[600px] lg:h-[700px]">
          {/* Left Large Sale Banner */}
          <Link to="/category/women" className="relative group overflow-hidden bg-neutral-100 h-[400px] md:h-full flex flex-col justify-end">
             <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Women's Sale" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
             <div className="relative z-20 p-8 md:p-12 text-white">
               <p className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold mb-3 text-red-500 bg-red-100/10 w-fit px-3 py-1 border border-red-500/30">End of Season</p>
               <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none mb-2">Mega<br/>Sale</h2>
               <p className="text-xl md:text-2xl font-light italic mb-8">Up to 70% Off selected styles</p>
               <span className="inline-block border border-white bg-white text-black px-8 md:px-10 py-3 md:py-4 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-white border-transparent hover:border-black transition-colors">Shop Women</span>
             </div>
          </Link>
          
          {/* Right Stack */}
          <div className="grid grid-rows-2 gap-4 h-[500px] md:h-full">
             {/* Top Right Sale Banner */}
             <Link to="/category/men" className="relative group overflow-hidden bg-neutral-100 flex flex-col items-center justify-center text-center">
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 transform object-top" alt="Men's Sale" />
                <div className="absolute inset-0 bg-black/30 z-10 transition-colors group-hover:bg-black/40" />
                <div className="relative z-20 p-8 text-white w-full">
                   <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-2">Menswear</h3>
                   <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold mb-6 text-red-400">Further Reductions</p>
                   <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold border-b border-white pb-1 group-hover:text-black group-hover:bg-white group-hover:border-transparent group-hover:px-4 group-hover:py-2 transition-all">Shop Men</span>
                </div>
             </Link>
             {/* Bottom Right Sale Banner */}
             <Link to="/category/accessories" className="relative group overflow-hidden bg-neutral-100 flex flex-col justify-end items-start text-left">
                <img src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800&auto=format&fit=crop" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Accessories Sale" />
                <div className="absolute inset-0 bg-black/20 z-10 transition-colors group-hover:bg-black/40" />
                <div className="relative z-20 p-8 text-white w-full">
                   <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-1">Accessories</h3>
                   <p className="text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Extra 20% Off at Checkout</p>
                   <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold border-b border-white pb-1 group-hover:text-black group-hover:bg-white group-hover:border-transparent group-hover:px-4 group-hover:py-2 transition-all">Shop Accessories</span>
                </div>
             </Link>
          </div>
        </div>
      </section>

      {/* Premium Pakistani Brands Section */}
      <section className="px-4 sm:px-10 py-16 bg-neutral-50 text-center">
        <h2 className="text-4xl md:text-5xl font-light italic mb-2">Designer Collections</h2>
        <p className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-400 mb-12">Featuring Premium Pakistani Brands</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-center opacity-80 mix-blend-multiply mb-16 border-b border-neutral-200 pb-16">
          <Link to="/brand/sana-safinaz" className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all hover:scale-110">
             <span className="font-serif text-xl md:text-2xl font-bold uppercase tracking-widest text-black">Sana<br/>Safinaz</span>
          </Link>
          <Link to="/brand/maria-b" className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all hover:scale-110">
             <span className="text-2xl md:text-3xl tracking-tighter font-black text-black">Maria.B</span>
          </Link>
          <Link to="/brand/khaadi" className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all hover:scale-110">
             <span className="font-serif text-xl md:text-2xl italic tracking-widest text-black">KHAADI</span>
          </Link>
          <Link to="/brand/asim-jofa" className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all hover:scale-110">
             <span className="text-lg md:text-xl font-bold uppercase tracking-[0.2em] text-black">Asim Jofa</span>
          </Link>
          <Link to="/brand/elan" className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all hover:scale-110">
             <span className="font-serif text-2xl md:text-3xl font-light text-black">ÉLAN</span>
          </Link>
          <Link to="/brand/gul-ahmed" className="flex flex-col items-center justify-center p-4 grayscale hover:grayscale-0 transition-all hover:scale-110">
             <span className="text-xl md:text-2xl font-bold tracking-tighter text-black">GulAhmed</span>
          </Link>
        </div>

        {/* Simulated Live Articles Feed */}
        <div className="text-left mt-8">
           <div className="flex items-center gap-3 mb-8">
              <span className="flex h-3 w-3 relative">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <h3 className="text-xl md:text-2xl font-light italic">Live Articles Feed</h3>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
             {[
               { brand: "Sana Safinaz", title: "Muzlin Spring '24", price: "Rs. 8,999", image: "https://images.unsplash.com/photo-1515378960530-abde627cc8de?q=80&w=400&auto=format&fit=crop" },
               { brand: "Maria.B", title: "Mprints Unstitched", price: "Rs. 7,450", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=400&auto=format&fit=crop" },
               { brand: "KHAADI", title: "Festive Collection Vol 1", price: "Rs. 12,900", image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=400&auto=format&fit=crop" },
               { brand: "Asim Jofa", title: "Zarq برق Festive", price: "Rs. 18,500", image: "https://images.unsplash.com/photo-1485230895920-ee9dc1f81c7f?q=80&w=400&auto=format&fit=crop" }
             ].map((article, i) => (
               <div key={i} className="group cursor-pointer text-left">
                 <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200 mb-4">
                   <div className="absolute top-2 left-2 z-10 bg-black text-white text-[8px] font-bold uppercase tracking-widest px-2 py-1">RESTOCKED</div>
                   <img src={article.image} alt={article.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                 </div>
                 <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#8c1c1c] mb-1">{article.brand}</h4>
                 <p className="text-sm font-serif mb-2 truncate">{article.title}</p>
                 <p className="text-xs font-bold text-neutral-800">{article.price}</p>
               </div>
             ))}
           </div>
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
            { title: "Dresses", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop" },
            { title: "Bags", image: "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop" },
            { title: "Shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop" }
          ].map((cat) => (
            <Link key={cat.title} to={`/category/${cat.title.toLowerCase()}`} className="group block relative h-[500px] overflow-hidden bg-neutral-100">
              <img src={cat.image} loading="lazy" alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
                  src={`https://images.unsplash.com/photo-1596207869680-77a83d690a78?q=80&w=400&auto=format&fit=crop`} 
                  loading="lazy"
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
               <img src="https://images.unsplash.com/photo-1550614000-4b95d4ebf519?q=80&w=800&auto=format&fit=crop" loading="lazy" alt="Boutique" className="w-full aspect-[4/5] object-cover" />
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
