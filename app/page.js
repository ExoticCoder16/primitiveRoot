'use client'
import { useState } from 'react'
import ResultTable from '@/components/ResultTable'

export default function Home() {
  const [base, setBase] = useState('')
  const [mod, setMod] = useState('')
  const [result, setResult] = useState(null)

  const handleCalculate = async () => {
    const res = await fetch(`/api/calculate?base=${base}&mod=${mod}`)
    const data = await res.json()
    setResult(data)
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Residue Calculator</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Base"
          value={base}
          onChange={(e) => setBase(e.target.value.replace(/^0+/, ''))}
          className="border p-2 rounded w-24"
        />
        <input
          type="text"
          placeholder="Mod"
          value={mod}
          onChange={(e) => setMod(e.target.value.replace(/^0+/, ''))}
          className="border p-2 rounded w-24"
        />
        <button
          onClick={handleCalculate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div>
          <div className="mb-2">
            <strong>Base × n mod {mod}:</strong> {result.linearResidues.join(', ')}
          </div>
          <div className="mb-4">
            <strong>Base^n mod {mod}:</strong> {result.expResidues.join(', ')}
          </div>
          <ResultTable result={result.table} />
        </div>
      )}
    </main>
  )
}
