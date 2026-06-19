import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend
} from "recharts"

import { useEffect, useState } from "react"

function MetricsChart({ ip }) {

    const [data, setData] = useState([])

    const fetchComplianceData = () => {

        if (!ip) return

        fetch(
            `http://127.0.0.1:5000/metrics/history/${ip}`
        )
            .then((response) => response.json())
            .then((history) => {

                const formattedData =
                    history.map((metric, index) => ({

                        point: new Date(
                            metric.timestamp
                        ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        }),

                        cpu: metric.cpu,

                        ram: metric.ram,

                        disk: metric.disk

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
                System Metrics Trend
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

                        <XAxis dataKey="point" />

                        <YAxis />

                        <Tooltip />

                        <Legend />

                        <Line
                            type="monotone"
                            dataKey="cpu"
                            stroke="#ef4444"
                            strokeWidth={3}
                        />

                        <Line
                            type="monotone"
                            dataKey="ram"
                            stroke="#2563eb"
                            strokeWidth={3}
                        />

                        <Line
                            type="monotone"
                            dataKey="disk"
                            stroke="#16a34a"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>

    )
}

export default MetricsChart