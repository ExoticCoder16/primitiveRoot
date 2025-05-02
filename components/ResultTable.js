export default function ResultTable({ result }) {
    return (
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">n</th>
              <th className="border px-4 py-2">2^n</th>
              <th className="border px-4 py-2">2^{"{n-1}"}</th>
              <th className="border px-4 py-2">2^{"{n-2}"}</th>
              <th className="border px-4 py-2">Skips</th>
              <th className="border px-4 py-2">Transition</th>
            </tr>
          </thead>
        <tbody>
          {result.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{row.n}</td>
              <td className="border px-4 py-2">{row.pow_n}</td>
              <td className="border px-4 py-2">{row.pow_n1}</td>
              <td className="border px-4 py-2">{row.pow_n2}</td>
              <td className="border px-4 py-2">{row.skips}</td>
              <td className="border px-4 py-2">{row.transition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
  