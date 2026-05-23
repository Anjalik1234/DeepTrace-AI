import { useEffect, useState } from "react"

function AIInsights() {

  const [report, setReport] = useState(null)

  useEffect(() => {

    const savedReport = localStorage.getItem(
      "ai_report"
    )

    if (savedReport) {

      setReport(
        JSON.parse(savedReport)
      )

    }

  }, [])

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8 !text-black">
        AI Security Insights
      </h1>

      {!report && (

        <div className="bg-yellow-100 p-6 rounded-2xl">

          <p className="text-lg text-yellow-800">

            No AI insights available yet.
            Run a compliance scan first.

          </p>

        </div>

      )}

      {report && (

        <div className="space-y-6">

          {report.results.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6"
            >

              <div className="flex justify-between items-center mb-4">

                <h2 className="text-2xl font-bold !text-black">
                  {item.rule}
                </h2>

                <span
                  className={`
                    px-4 py-2 rounded-xl text-white font-bold
                    ${
                      item.status === "PASS"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }
                  `}
                >
                  {item.status}
                </span>

              </div>

              <div className="mb-4">

                <h3 className="font-bold text-lg mb-2 text-red-600">
                  AI Risk Analysis
                </h3>

                <p className="text-gray-700">
                  {item.risk}
                </p>

              </div>

              <div>

                <h3 className="font-bold text-lg mb-2 text-green-600">
                  AI Recommendation
                </h3>

                <p className="text-gray-700">
                  {item.recommendation}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}

export default AIInsights