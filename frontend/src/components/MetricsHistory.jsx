import { useEffect, useState } from "react"

function MetricsHistory({ ip }) {

    const [history, setHistory] = useState([])

    const fetchMetricsHistory = () => {

        if (!ip) return

        fetch(
            `http://127.0.0.1:5000/metrics/history/${ip}`
        )
            .then((response) => response.json())
            .then((data) => {

                setHistory(data.reverse())

            })

    }

    useEffect(() => {

        fetchMetricsHistory()

        const interval = setInterval(() => {

            fetchMetricsHistory()

        }, 30000)

        return () => clearInterval(interval)

    }, [ip])

    return (

        <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">

            <h2 className="text-2xl font-bold mb-4">
                Metrics History
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left px-4 py-2">
                            Time
                        </th>

                        <th className="text-left px-4 py-2">
                            CPU %
                        </th>

                        <th className="text-left px-4 py-2">
                            RAM %
                        </th>

                        <th className="text-left px-4 py-2">
                            Disk %
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        history.map((metric, index) => (

                            <tr
                                key={index}
                                className="border-b"
                            >

                                <td className="px-4 py-2">

                                    {
                                        new Date(
                                            metric.timestamp
                                        ).toLocaleString()
                                    }

                                </td>

                                <td className="px-4 py-2 text-red-600">

                                    {metric.cpu}

                                </td>

                                <td className="px-4 py-2 text-blue-600">

                                    {metric.ram}

                                </td>

                                <td className="px-4 py-2 text-green-600">

                                    {metric.disk}

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    )
}

export default MetricsHistory