import { motion } from 'framer-motion'

export default function Hero({ onOrderNow }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage:'radial-gradient(circle at 20% 20%, #d4af37 0, transparent 40%), radial-gradient(circle at 80% 0%, #14532d 0, transparent 40%)'}}/>
      <div className="px-6 pt-16 pb-10">
        <div className="max-w-2xl">
          <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.6}} className="text-4xl font-extrabold tracking-tight text-white">
            Pakkhtun Biryani
          </motion.h1>
          <p className="mt-3 text-green-100">Premium • Authentic • Modern • Trustworthy</p>
          <div className="mt-3 inline-flex items-center text-sm text-amber-300 bg-amber-900/30 rounded-full px-3 py-1 border border-amber-400/30">
            Best Biryani – G Plus Guwahati Food Awards 2024
          </div>
          <motion.button whileTap={{scale:0.98}} onClick={onOrderNow} className="mt-6 bg-green-700 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg">
            Order Now
          </motion.button>
        </div>
      </div>
      <div className="px-6 pb-8">
        <div className="grid grid-cols-3 gap-3">
          {['https://images.unsplash.com/photo-1604908554049-1e4f7f1e978a','https://images.unsplash.com/photo-1551183053-bf91a1d81141','https://images.unsplash.com/photo-1544025162-d76694265947'].map((src, i)=> (
            <motion.img key={i} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2*i}} src={`${src}?auto=format&fit=crop&w=400&q=60`} alt="Biryani" className="h-28 w-full object-cover rounded-xl border border-white/10"/>
          ))}
        </div>
      </div>
    </section>
  )
}
