import { useMemo } from 'react'

export default function Cart({ items, onInc, onDec, onRemove, onCheckout, coupon, onApplyCoupon, deliveryType, setDeliveryType }){
  const subtotal = useMemo(()=> items.reduce((s,i)=> s + i.total_price, 0), [items])
  const discount = coupon?.discount || 0
  const deliveryFee = deliveryType==='takeaway'? 0 : (items.length? 20:0)
  const total = Math.max(0, subtotal - discount + deliveryFee)

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
      <div className="text-white font-semibold">Your Cart</div>
      {items.length===0 && <div className="text-green-100 text-sm">Cart is empty</div>}
      {items.map(ci => (
        <div key={ci.key} className="flex items-center justify-between gap-2 text-white">
          <div className="flex items-center gap-2">
            <img src={`${ci.image_url}?auto=format&fit=crop&w=100&q=60`} className="w-12 h-12 rounded object-cover"/>
            <div>
              <div className="text-sm font-medium">{ci.title} ({ci.variant})</div>
              <div className="text-xs text-green-100/70">₹{ci.unit_price} x {ci.quantity}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={()=>onDec(ci.key)} className="w-7 h-7 rounded bg-white/10 text-white">-</button>
            <span className="w-6 text-center">{ci.quantity}</span>
            <button onClick={()=>onInc(ci.key)} className="w-7 h-7 rounded bg-white/10 text-white">+</button>
            <button onClick={()=>onRemove(ci.key)} className="ml-2 text-red-300 text-xs">Remove</button>
          </div>
        </div>
      ))}

      <div className="pt-2 border-t border-white/10 space-y-2 text-sm text-green-100">
        <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Discount</span><span>-₹{discount.toFixed(2)}</span></div>
        <div className="flex justify-between"><span>Delivery</span><span>₹{deliveryFee.toFixed(2)}</span></div>
        <div className="flex justify-between font-semibold text-white"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
      </div>

      <div className="flex gap-2">
        <input id="coupon" placeholder="Coupon code" className="flex-1 bg-white/10 text-white placeholder-green-100/60 rounded px-3 py-2 text-sm outline-none"/>
        <button onClick={()=>{
          const code = document.getElementById('coupon').value
          onApplyCoupon && onApplyCoupon(code, subtotal)
        }} className="px-3 py-2 bg-amber-600 text-white rounded text-sm">Apply</button>
      </div>

      <div className="flex items-center gap-2 text-sm text-green-100">
        <span>Order for</span>
        <button onClick={()=>setDeliveryType('delivery')} className={`px-2 py-1 rounded ${deliveryType==='delivery'?'bg-green-700 text-white':'bg-white/10'}`}>Delivery</button>
        <button onClick={()=>setDeliveryType('takeaway')} className={`px-2 py-1 rounded ${deliveryType==='takeaway'?'bg-green-700 text-white':'bg-white/10'}`}>Takeaway</button>
      </div>

      <button disabled={!items.length} onClick={onCheckout} className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-2 rounded disabled:opacity-50">Checkout</button>
    </div>
  )
}
