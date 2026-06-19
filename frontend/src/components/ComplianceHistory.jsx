import { useEffect, useState } from "react"

function ComplianceHistory({ ip }) {

    const [history, setHistory] = useState([])

    const fetchComplianceHistory = () => {

        if (!ip) return

        fetch(
            `http://127.0.0.1:5000/compliance/history/${ip}`
        )
            .then((response) => response.json())
            .then((data) => {

                setHistory(data.reverse())

            })

    }

    useEffect(() => {

        fetchComplianceHistory()

        const interval = setInterval(() => {

            fetchComplianceHistory()

        }, 30000)

        return () => clearInterval(interval)

    }, [ip])


    return (

        <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">

            <h2 className="text-2xl font-bold mb-4">
                Compliance History
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left py-2 px-4 min-w-[180px]">
                            Time
                        </th>

                        <th className="text-left py-2 px-4 min-w-[80px]">
                            Score
                        </th>

                        <th className="text-left py-2 px-4 min-w-[80px]">
                            Passed
                        </th>

                        <th className="text-left py-2 px-4 min-w-[80px]">
                            Failed
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {
                        history.map((scan, index) => (

                            <tr
                                key={index}
                                className="border-b"
                            >

                                <td className="py-2 px-4">

                                    {
                                        new Date(
                                            scan.timestamp
                                        ).toLocaleString()
                                    }

                                </td>

                                <td className="py-2 px-4">

                                    {scan.score}

                                </td>

                                <td className="py-2 text-green-600 px-4">

                                    {scan.passed}

                                </td>

                                <td className="py-2 text-red-600 px-4">

                                    {scan.failed}

                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    )
}

export default ComplianceHistory