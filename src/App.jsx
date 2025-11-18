import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import BannerCarousel from './components/BannerCarousel'
import Menu from './components/Menu'
import Cart from './components/Cart'

const brand = {
  bg: 'from-emerald-950 via-emerald-900 to-emerald-950',
  card: 'bg-white/5 border border-white/10',
}

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [cart, setCart] = useState([])
  const [deliveryType, setDeliveryType] = useState('delivery')
  const [coupon, setCoupon] = useState(null)
  const [seeded, setSeeded] = useState(false)

  useEffect(()=>{ seed() }, [])
  async function seed(){
    try{ await fetch(`${baseUrl}/admin/seed`, {method:'POST'}) ; setSeeded(true) }catch(e){ console.error(e) }
  }

  function addToCart(item, variant='full'){
    const unit = variant==='half' && item.price_half? item.price_half : item.price_full
    const key = `${item.id}-${variant}`
    setCart(prev => {
      const ex = prev.find(i=>i.key===key)
      if(ex){
        return prev.map(i=> i.key===key? {...i, quantity:i.quantity+1, total_price:(i.quantity+1)*i.unit_price}: i)
      }
      return [...prev, { key, item_id:item.id, title:item.title, variant, quantity:1, unit_price:unit, total_price:unit, image_url:item.image_url }]
    })
  }
  function inc(key){ setCart(prev => prev.map(i=> i.key===key? {...i, quantity:i.quantity+1, total_price:(i.quantity+1)*i.unit_price}: i)) }
  function dec(key){ setCart(prev => prev.flatMap(i=> i.key!==key? [i] : (i.quantity<=1? [] : [{...i, quantity:i.quantity-1, total_price:(i.quantity-1)*i.unit_price}])))}
  function removeItem(key){ setCart(prev => prev.filter(i=> i.key!==key)) }

  async function applyCoupon(code, subtotal){
    try{
      const r = await fetch(`${baseUrl}/cart/apply-coupon`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({code, subtotal})})
      const d = await r.json(); setCoupon(d.applied? d: null)
    }catch(e){ console.error(e) }
  }

  async function checkout(){
    const payload = {
      phone: '9999999999',
      items: cart.map(i=> ({ item_id: i.item_id, title:i.title, variant:i.variant, quantity:i.quantity, unit_price:i.unit_price, total_price:i.total_price, image_url:i.image_url })),
      delivery_type: deliveryType,
      address: deliveryType==='delivery'? { line1: 'Customer location', city: 'Guwahati', state: 'Assam', pincode: '781001' }: null,
      coupon_code: coupon?.code || null,
      payment_method: 'cod'
    }
    const r = await fetch(`${baseUrl}/orders`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})
    const d = await r.json()
    alert(`Order placed!\nOrder ID: ${d.order?.id}\nTotal: ₹${d.order?.total}`)
    setCart([]); setCoupon(null)
  }

  return (
    <div className={`min-h-screen bg-gradient-to-b ${brand.bg} text-green-50`}> 
      <div className="max-w-md mx-auto pb-24">
        <Hero onOrderNow={()=>{
          const el = document.getElementById('menu')
          el?.scrollIntoView({behavior:'smooth'})
        }} />
        <div className="px-4 space-y-4">
          <BannerCarousel />
          <section id="menu" className={`${brand.card} rounded-2xl p-4`}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-white">Menu</h2>
              <span className="text-xs text-amber-300">Deep Green • Gold • White</span>
            </div>
            <Menu onAdd={addToCart} />
          </section>

          <section className="sticky bottom-0">
            <Cart items={cart} onInc={inc} onDec={dec} onRemove={removeItem} onCheckout={checkout} coupon={coupon} onApplyCoupon={applyCoupon} deliveryType={deliveryType} setDeliveryType={setDeliveryType} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default App
