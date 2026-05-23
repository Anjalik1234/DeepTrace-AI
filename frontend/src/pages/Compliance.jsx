import { useState } from "react"

function Compliance() {

  const [loading, setLoading] = useState(false)

  const [report, setReport] = useState(null)


  const runScan = async () => {

    setLoading(true)

    const response = await fetch(
      "http://127.0.0.1:5000/scan/compliance",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ip: "172.22.95.106",
          username: "anjali1194",
          password: "anjali1194",
        }),
      }
    )

    const data = await response.json()

    setReport(data)

    localStorage.setItem(
      "ai_report",
      JSON.stringify(data)
    )

    setLoading(false)
  }


  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold !text-black">
          Compliance Scanner
        </h1>

        <button
          onClick={runScan}
          className="bg-black text-white px-6 py-3 rounded-xl"
        >
          Start Scan
        </button>

      </div>

      {/* Loading */}
      {loading && (

        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-xl mb-6">

          Running compliance scan...

        </div>
      )}

      {/* Results */}
      {report && (

        <div className="space-y-6">

          {/* Score Cards */}
          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h2 className="text-gray-500 mb-2 !text-black">
                Compliance Score
              </h2>

              <p className="text-4xl font-bold text-green-600">
                {report.compliance_score}%
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h2 className="text-gray-500 mb-2 !text-black">
                Passed Checks
              </h2>

              <p className="text-4xl font-bold text-green-600">
                {report.passed}
              </p>

            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h2 className="text-gray-500 mb-2 !text-black">
                Failed Checks
              </h2>

              <p className="text-4xl font-bold text-red-600">
                {report.failed}
              </p>

            </div>

          </div>

          {/* Detailed Results */}
          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-6 !text-black">
              Scan Results
            </h2>

            <table className="w-full">

              <thead>

                <tr className="border-b text-left">

                  <th className="pb-3">
                    Rule
                  </th>

                  <th className="pb-3">
                    Status
                  </th>

                  <th className="pb-3">
                    Details
                  </th>

                </tr>

              </thead>

              <tbody>

                {report.results.map((result, index) => (

                  <tr
                    key={index}
                    className="border-b"
                  >

                    <td className="py-4 font-medium">
                      {result.rule}
                    </td>

                    <td
                      className={`
                        py-4 font-bold
                        ${result.status === "PASS"
                          ? "text-green-600"
                          : result.status === "FAIL"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }
                      `}
                    >
                      {result.status}
                    </td>

                    <td className="py-4 text-gray-700">
                      {result.details}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  )
}

export default Compliance