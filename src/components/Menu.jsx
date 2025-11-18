import { useEffect, useMemo, useState } from 'react'

const CATEGORIES = ["Matka Biryanis","Kebabs","Rolls","Combos","Add-ons & Drinks"]

export default function Menu({ onAdd }){
  const [items, setItems] = useState([])
  const [active, setActive] = useState('Matka Biryanis')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(()=>{ fetchMenu() },[])

  async function fetchMenu(){
    try{
      const r = await fetch(`${baseUrl}/menu`)
      const d = await r.json()
      setItems(d)
    }catch(e){ console.error(e) }
  }

  const grouped = useMemo(()=>{
    const g = Object.fromEntries(CATEGORIES.map(c=>[c,[]]))
    for(const it of items){ if(g[it.category]) g[it.category].push(it) }
    return g
  }, [items])

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
        {CATEGORIES.map(c => (
          <button key={c} onClick={()=>setActive(c)} className={`px-3 py-2 rounded-full text-sm whitespace-nowrap border ${active===c? 'bg-green-700 text-white border-green-600':'bg-white/5 text-green-100 border-white/10'}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {(grouped[active]||[]).map(item => (
          <div key={item.id} className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
            <img src={`${item.image_url}?auto=format&fit=crop&w=300&q=60`} alt={item.title} className="w-24 h-24 object-cover rounded-lg"/>
            <div className="flex-1">
              <div className="font-semibold text-white">{item.title}</div>
              <div className="text-xs text-green-100/80 line-clamp-2">{item.description}</div>
              <div className="mt-2 flex items-center gap-3">
                {item.price_half && <span className="text-amber-300 text-sm">Half ₹{item.price_half}</span>}
                <span className="text-amber-300 text-sm">Full ₹{item.price_full}</span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
              {item.is_signature && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">Signature</span>}
              <button onClick={()=>onAdd(item, 'full')} className="px-3 py-1.5 rounded-lg bg-green-700 hover:bg-green-600 text-white text-sm">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
