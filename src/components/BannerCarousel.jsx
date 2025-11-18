import { useEffect, useState } from 'react'

export default function BannerCarousel() {
  const [index, setIndex] = useState(0)
  const banners = [
    {
      title: 'Festival Combo Bonanza',
      sub: 'Save more with family combos',
      color: 'from-emerald-900 to-emerald-800',
    },
    {
      title: 'Matka Mania',
      sub: '15% off on Signature Matka Biryanis',
      color: 'from-yellow-900 to-amber-800',
    },
    {
      title: 'New Rolls Menu',
      sub: 'Try our tikka & reshmi rolls',
      color: 'from-stone-900 to-stone-800',
    },
  ]

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % banners.length), 3500)
    return () => clearInterval(t)
  }, [])

  const b = banners[index]

  return (
    <div className={`rounded-xl p-4 text-white bg-gradient-to-br ${b.color} border border-white/10`}> 
      <div className="font-semibold">{b.title}</div>
      <div className="text-sm opacity-80">{b.sub}</div>
    </div>
  )
}
