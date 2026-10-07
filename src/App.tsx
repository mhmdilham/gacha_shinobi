import { useState } from 'react'
import { Navbar } from './components/Navbar'
import { RulesModal } from './components/RulesModal'
import { StepIdentity } from './components/StepIdentity'
import { StepParentsRoll } from './components/StepParentsRoll'
import { StepAwakening } from './components/StepAwakening'
import { StepElements } from './components/StepElements'
import { StepBijuu } from './components/StepBijuu'
import { StepSpecialMode } from './components/StepSpecialMode'
import { StepJutsuArsenal } from './components/StepJutsuArsenal'
import { StepFinalCard } from './components/StepFinalCard'
import { calculatePowerScore, runCompleteGacha, evaluateBijuuMasteryAndGift } from './utils/gachaEngine'
import type {
  ShinobiCharacter,
  VillageId,
  ClanInfo,
  DojutsuType,
  ElementType,
  BijuuType,
  SpecialModeType,
  JutsuInfo
} from './types/ninja'
import { playClickSound } from './utils/audio'
import { FastForward } from 'lucide-react'

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false)

  // Real Progressive State (Nothing is pre-rolled!)
  const [name, setName] = useState<string>('')
  const [village, setVillage] = useState<VillageId>('konoha')

  const [fatherClan, setFatherClan] = useState<ClanInfo | null>(null)
  const [motherClan, setMotherClan] = useState<ClanInfo | null>(null)
  const [reincarnation, setReincarnation] = useState<'None' | 'Asura' | 'Indra' | 'Indra + Asura'>('None')

  const [dojutsu, setDojutsu] = useState<DojutsuType | null>(null)
  const [hyugaBranch, setHyugaBranch] = useState<'Main Family' | 'Branch Family' | undefined>()
  const [dojutsuNote, setDojutsuNote] = useState<string | undefined>()
  const [isTransplantedDojutsu, setIsTransplantedDojutsu] = useState<boolean | undefined>()

  const [elements, setElements] = useState<ElementType[] | null>(null)
  const [bijuu, setBijuu] = useState<BijuuType | null>(null)
  const [specialMode, setSpecialMode] = useState<SpecialModeType | null>(null)

  const [character, setCharacter] = useState<ShinobiCharacter | null>(null)

  // Step 1: Identity Complete
  const handleStartIdentity = (ninjaName: string, ninjaVillage: VillageId) => {
    setName(ninjaName)
    setVillage(ninjaVillage)
    setCurrentStep(2)
  }

  // Step 2: Parents Roll Complete
  const handleParentsComplete = (
    father: ClanInfo,
    mother: ClanInfo,
    reinc: 'None' | 'Asura' | 'Indra' | 'Indra + Asura'
  ) => {
    setFatherClan(father)
    setMotherClan(mother)
    setReincarnation(reinc)
    setCurrentStep(3)
  }

  // Step 3: Dojutsu Awakening Complete
  const handleAwakeningComplete = (
    eye: DojutsuType,
    branch?: 'Main Family' | 'Branch Family',
    note?: string,
    isTransplanted?: boolean
  ) => {
    setDojutsu(eye)
    setHyugaBranch(branch)
    setDojutsuNote(note)
    setIsTransplantedDojutsu(isTransplanted)
    setCurrentStep(4)
  }

  // Step 4: Elements Complete
  const handleElementsComplete = (el: ElementType[]) => {
    setElements(el)
    setCurrentStep(5)
  }

  // Step 5: Bijuu Complete
  const handleBijuuComplete = (beast: BijuuType) => {
    setBijuu(beast)
    setCurrentStep(6)
  }

  // Step 6: Special Mode Complete
  const handleModeComplete = (mode: SpecialModeType) => {
    setSpecialMode(mode)
    setCurrentStep(7)
  }

  // Step 7: Jutsu Complete -> Calculate final character
  const handleJutsuComplete = (
    signatureJutsus: JutsuInfo[],
    tacticalJutsus: JutsuInfo[],
    combos: string[]
  ) => {
    if (fatherClan && motherClan && dojutsu && elements && bijuu && specialMode) {
      const bijuuEvaluation = evaluateBijuuMasteryAndGift(
        bijuu,
        dojutsu,
        fatherClan,
        motherClan,
        combos,
        elements
      )

      const finalKekkeiGenkai = Array.from(new Set([...combos, ...bijuuEvaluation.inheritedKekkeiGenkai]))
      const finalElements = Array.from(new Set([...elements, ...bijuuEvaluation.inheritedElements]))

      const { scores, rank } = calculatePowerScore(
        fatherClan,
        motherClan,
        dojutsu,
        finalElements,
        finalKekkeiGenkai,
        bijuu,
        specialMode,
        signatureJutsus,
        tacticalJutsus,
        reincarnation,
        bijuuEvaluation.bijuuDominanceBonus
      )

      const characterObj: ShinobiCharacter = {
        id: 'shinobi-' + Math.random().toString(36).substring(2, 9),
        name,
        village,
        fatherClan,
        motherClan,
        reincarnation,
        dojutsu,
        hyugaBranch,
        dojutsuNote,
        isTransplantedDojutsu,
        elements: finalElements,
        extraKekkeiGenkai: finalKekkeiGenkai,
        bijuu,
        bijuuMastery: bijuuEvaluation.bijuuMastery,
        bijuuGift: bijuuEvaluation.bijuuGift,
        specialMode,
        signatureJutsus,
        tacticalJutsus,
        scores,
        rank,
        timestamp: Date.now()
      }

      setCharacter(characterObj)
    }
    setCurrentStep(8)
  }

  // Reset to Step 1
  const handleReset = () => {
    setName('')
    setFatherClan(null)
    setMotherClan(null)
    setDojutsu(null)
    setHyugaBranch(undefined)
    setDojutsuNote(undefined)
    setIsTransplantedDojutsu(undefined)
    setElements(null)
    setBijuu(null)
    setSpecialMode(null)
    setCharacter(null)
    setCurrentStep(1)
  }

  // Fast Forward / Skip button
  const handleSkipToFinal = () => {
    playClickSound()
    const autoChar = runCompleteGacha(name || 'Shinobi Rahasia', village)
    setCharacter(autoChar)
    setCurrentStep(8)
  }

  const STEP_TITLES = [
    'Identitas',
    'Silsilah Klan',
    'Dojutsu',
    'Elemen',
    'Bijuu',
    'Mode',
    'Jutsu',
    'Kartu Ninja'
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500 selection:text-white">
      {/* Navbar */}
      <Navbar
        onOpenRules={() => setIsRulesOpen(true)}
        onReset={handleReset}
        canReset={currentStep > 1}
      />

      {/* Probability Rules Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        {/* Step Progress Tracker */}
        {currentStep > 1 && currentStep < 8 && (
          <div className="mb-8 max-w-3xl mx-auto w-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                Alur Pembuatan Karakter ({currentStep}/8)
              </span>

              {currentStep < 8 && (
                <button
                  onClick={handleSkipToFinal}
                  className="inline-flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-semibold transition-colors"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Langsung ke Hasil</span>
                </button>
              )}
            </div>

            {/* Stepper bar (8 steps) */}
            <div className="grid grid-cols-8 gap-1.5">
              {STEP_TITLES.map((title, idx) => {
                const stepNum = idx + 1
                const isActive = currentStep === stepNum
                const isCompleted = currentStep > stepNum
                return (
                  <div key={title} className="flex flex-col gap-1">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-red-500'
                          : isActive
                          ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]'
                          : 'bg-slate-800'
                      }`}
                    />
                    <span
                      className={`text-[9px] hidden sm:block text-center truncate ${
                        isActive
                          ? 'text-amber-300 font-bold'
                          : isCompleted
                          ? 'text-slate-400'
                          : 'text-slate-600'
                      }`}
                    >
                      {title}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Step 1: Input Identitas */}
        {currentStep === 1 && <StepIdentity onStartGacha={handleStartIdentity} />}

        {/* Step 2: Roll Orang Tua (ON-DEMAND ROLL) */}
        {currentStep === 2 && (
          <StepParentsRoll onComplete={handleParentsComplete} />
        )}

        {/* Step 3: Dojutsu & Awakening (ON-DEMAND ROLL) */}
        {currentStep === 3 && fatherClan && motherClan && (
          <StepAwakening
            fatherClan={fatherClan}
            motherClan={motherClan}
            reincarnation={reincarnation}
            onComplete={handleAwakeningComplete}
          />
        )}

        {/* Step 4: Afinitas Elemen Dasar (ON-DEMAND ROLL) */}
        {currentStep === 4 && fatherClan && motherClan && (
          <StepElements
            fatherClan={fatherClan}
            motherClan={motherClan}
            onComplete={handleElementsComplete}
          />
        )}

        {/* Step 5: Wadah Bijuu (ON-DEMAND ROLL) */}
        {currentStep === 5 && fatherClan && motherClan && elements && dojutsu && (
          <StepBijuu
            fatherClan={fatherClan}
            motherClan={motherClan}
            elements={elements}
            dojutsu={dojutsu}
            reincarnation={reincarnation}
            onComplete={handleBijuuComplete}
          />
        )}

        {/* Step 6: Mode Transformasi Khusus (ON-DEMAND ROLL) */}
        {currentStep === 6 && elements && dojutsu && (
          <StepSpecialMode
            elements={elements}
            dojutsu={dojutsu}
            bijuu={bijuu || undefined}
            reincarnation={reincarnation}
            onComplete={handleModeComplete}
          />
        )}

        {/* Step 7: Arsenal Jutsu (ON-DEMAND ROLL) */}
        {currentStep === 7 && fatherClan && motherClan && elements && dojutsu && specialMode && (
          <StepJutsuArsenal
            fatherClan={fatherClan}
            motherClan={motherClan}
            elements={elements}
            dojutsu={dojutsu}
            bijuu={bijuu || undefined}
            onComplete={handleJutsuComplete}
          />
        )}

        {/* Step 8: Grand Shinobi Card */}
        {currentStep === 8 && character && (
          <StepFinalCard character={character} onReroll={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center border-t border-slate-900 text-xs text-slate-500">
        <p>© 2026 Gacha Shinobi • Dibuat berdasarkan Logika Silsilah & Dojutsu Naruto Universe</p>
      </footer>
    </div>
  )
}
