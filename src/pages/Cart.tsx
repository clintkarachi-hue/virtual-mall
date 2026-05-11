import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-10 py-32 text-center flex flex-col items-center">
         <h1 className="text-3xl font-light italic leading-tight tracking-tight mb-4">Your Shopping Bag</h1>
         <p className="text-neutral-500 text-sm mb-8 font-light">Your bag is currently empty.</p>
         <Link to="/shop" className="inline-block border border-neutral-200 px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white hover:border-black transition-colors">
            Continue Shopping
         </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10 py-16">
      <h1 className="text-3xl font-light italic leading-tight tracking-tight mb-12 border-b border-neutral-100 pb-8">Your Shopping Bag</h1>

      <div className="flex flex-col lg:flex-row gap-16">
         {/* Cart Items */}
         <div className="flex-1">
            <div className="border-b border-neutral-200 pb-4 hidden sm:grid grid-cols-12 gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
               <div className="col-span-6">Item</div>
               <div className="col-span-2 text-center">Price</div>
               <div className="col-span-2 text-center">Quantity</div>
               <div className="col-span-2 text-right">Total</div>
            </div>
            
            <div className="divide-y divide-neutral-100">
               {items.map((item) => (
                  <div key={`${item.productId}-${item.variant}`} className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                     <div className="col-span-1 sm:col-span-6 flex gap-6">
                        <div className="w-24 h-32 bg-neutral-100 flex-shrink-0">
                           {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex flex-col justify-center">
                           <h3 className="text-xs font-bold uppercase tracking-tighter text-black mb-1">{item.name}</h3>
                           {item.variant && <p className="text-[10px] text-neutral-500 mb-4 uppercase tracking-widest">Variant: {item.variant}</p>}
                           <button 
                             onClick={() => removeItem(item.productId, item.variant)}
                             className="text-neutral-400 hover:text-black flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold w-fit mt-4 transition-colors"
                           >
                             <Trash2 className="w-3 h-3 stroke-[1.5]" /> Remove
                           </button>
                        </div>
                     </div>
                     <div className="col-span-1 sm:col-span-2 text-left sm:text-center text-neutral-500 font-serif italic text-sm">
                        ${item.price}
                     </div>
                     <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center">
                        <div className="flex items-center border border-neutral-200">
                           <button 
                             onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1), item.variant)}
                             className="px-3 py-1 hover:bg-neutral-100 text-neutral-500 transition-colors"
                           >-</button>
                           <span className="px-3 py-1 text-[11px] font-medium">{item.quantity}</span>
                           <button 
                             onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variant)}
                             className="px-3 py-1 hover:bg-neutral-100 text-neutral-500 transition-colors"
                           >+</button>
                        </div>
                     </div>
                     <div className="col-span-1 sm:col-span-2 text-left sm:text-right text-sm font-serif italic">
                        ${(item.price * item.quantity).toFixed(2)}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Order Summary */}
         <div className="w-full lg:w-96">
            <div className="p-8 border border-neutral-100 bg-white shadow-sm">
               <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-900 mb-8 border-b border-neutral-100 pb-4">Order Summary</h2>
               
               <div className="space-y-4 text-xs font-medium mb-6 border-b border-neutral-100 pb-6">
                  <div className="flex justify-between">
                     <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Subtotal</span>
                     <span className="font-serif italic">${totalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Shipping</span>
                     <span className="font-serif italic text-neutral-400">Calculated</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Estimated Tax</span>
                     <span className="font-serif italic text-neutral-400">Calculated</span>
                  </div>
               </div>
               
               <div className="flex justify-between items-center mb-10">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Total</span>
                  <span className="text-xl font-light italic">${totalPrice().toFixed(2)}</span>
               </div>
               
               <Link to="/checkout" className="w-full flex items-center justify-center gap-2 bg-black text-white px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-80 transition-opacity">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
         </div>
      </div>
    </div>
  );
}
