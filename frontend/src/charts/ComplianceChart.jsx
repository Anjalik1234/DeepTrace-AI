import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts"

import { useEffect, useState } from "react"

function ComplianceChart({ ip }) {

  const [data, setData] = useState([])

  const fetchComplianceData = () => {

    if (!ip) return

    fetch(
      `http://127.0.0.1:5000/compliance/history/${ip}`
    )
      .then((response) => response.json())
      .then((history) => {

        const formattedData =
          history.map((scan) => ({

            scan: new Date(
              scan.timestamp
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }),

            score: scan.score

          }))

        setData(formattedData)

      })

  }

  useEffect(() => {

    fetchComplianceData()

    const interval = setInterval(() => {

      fetchComplianceData()

    }, 30000)

    return () => clearInterval(interval)

  }, [ip])

  return (

    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold mb-6 text-black">
        Compliance Trend
      </h2>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis dataKey="scan" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="#16a34a"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>

  )
}

export default ComplianceChart