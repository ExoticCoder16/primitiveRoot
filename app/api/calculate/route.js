export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const base = Number(searchParams.get('base'))
    const mod = Number(searchParams.get('mod'))
  
    const maxN = 7 // you can adjust or make dynamic
    const linearResidues = []
    const expResidues = []
    const table = []
    const cycle = []
  
    // Generate linear residues
    for (let i = 1; i <= maxN; i++) {
      linearResidues.push((base * i) % mod)
    }
  
    // Generate exp residues and table
    let seen = new Set()
    let nVal = 1
    for (let n = 1; n <= maxN; n++) {
      nVal = (nVal * base) % mod
      expResidues.push(nVal)
    }
  
    // Find transitions on 2,4,1 cycle or generalized version
    const refCycle = []
    let cur = base % mod
    for (let i = 0; i < mod; i++) {
      if (!refCycle.includes(cur)) refCycle.push(cur)
      cur = (cur * base) % mod
      if (cur === base % mod) break
    }
  
    let prevIdx = 0
    for (let n = 2; n <= maxN + 1; n++) {
      const pow_n = Math.pow(base, n)
      const pow_n1 = Math.pow(base, n -1)
      const pow_n2 = Math.pow(base, n -2)
      const skips = Math.pow(base, n -2) -1
      const from = refCycle[(prevIdx) % refCycle.length]
      const to = refCycle[(prevIdx +1) % refCycle.length]
      table.push({
        n,
        pow_n,
        pow_n1,
        pow_n2,
        skips,
        transition: `${from} → ${to}`,
      })
      prevIdx = (prevIdx +1) % refCycle.length
    }
  
    return Response.json({ linearResidues, expResidues, table })
  }
  