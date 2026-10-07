import React, { useState } from 'react'
import { VILLAGES } from '../data/ninjaData'
import type { VillageId } from '../types/ninja'
import { Sparkles, Dices, ArrowRight } from 'lucide-react'
import { playClickSound } from '../utils/audio'

interface StepIdentityProps {
  onStartGacha: (name: string, village: VillageId) => void
}

const RANDOM_NAMES = [
  'Ryuto',
  'Ren',
  'Kaito',
  'Hayate',
  'Akira',
  'Shin',
  'Kenji',
  'Kazuki',
  'Yuki',
  'Hotaru',
  'Kohaku',
  'Kurogane'
]

export const StepIdentity: React.FC<StepIdentityProps> = ({ onStartGacha }) => {
  const [name, setName] = useState('')
  const [selectedVillage, setSelectedVillage] = useState<VillageId>('konoha')

  const handleRandomName = () => {
    playClickSound()
    const random = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)]
    setName(random)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalName = name.trim() || 'Shinobi Misterius'
    playClickSound()
    onStartGacha(finalName, selectedVillage)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
      {/* Step Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-300 text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Tahap 1: Inisiasi Takdir
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-100 font-['Cinzel'] tracking-wide">
          Tentukan Identitas Shinobi
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Setiap legenda shinobi bermula dari sebuah nama dan desa tanah kelahiran.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Nama Ninja Kamu
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Ryuto, Kaito, Hinata..."
              maxLength={24}
              className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all font-medium text-sm"
            />
            <button
              type="button"
              onClick={handleRandomName}
              title="Pilih Nama Acak"
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
            >
              <Dices className="w-4 h-4 text-amber-400" />
              <span>Acak</span>
            </button>
          </div>
        </div>

        {/* Village Picker */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
            Pilih Desa Asal (Kakure Sato)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {VILLAGES.map((v) => {
              const isSelected = selectedVillage === v.id
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    playClickSound()
                    setSelectedVillage(v.id)
                  }}
                  className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-500/80 bg-gradient-to-b from-slate-800 to-slate-900 shadow-lg shadow-amber-950/20 ring-1 ring-amber-500/50'
                      : 'border-slate-800/90 bg-slate-950/60 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{v.symbol}</span>
                    <span className="text-xs font-serif text-slate-400">{v.kanji}</span>
                  </div>
                  <div>
                    <h4
                      className="font-bold text-sm"
                      style={{ color: isSelected ? v.color : '#e2e8f0' }}
                    >
                      {v.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-snug">
                      {v.desc}
                    </p>
                  </div>
                  {isSelected && (
                    <div
                      className="absolute top-0 right-0 w-8 h-8 rounded-bl-full flex items-center justify-center text-[10px] font-bold text-white pl-2 pb-2"
                      style={{ backgroundColor: v.color }}
                    >
                      ✓
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-base tracking-wider uppercase font-['Cinzel'] shadow-xl shadow-red-950/60 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 border border-red-500/40"
          >
            <span>Buka Gulungan Takdir (Spin Silsilah)</span>
            <ArrowRight className="w-5 h-5 text-amber-200" />
          </button>
        </div>
      </form>
    </div>
  )
}
