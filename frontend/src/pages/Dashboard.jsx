import DashboardCard from "../components/DashboardCard"
import RecentAlerts from "../components/RecentAlerts"
import ServerTable from "../components/ServerTable"
import ComplianceChart from "../charts/ComplianceChart"
import ThreatChart from "../charts/ThreatChart"
import MetricsChart from "../charts/MetricsChart"
import MetricsHistory from "../components/MetricsHistory"
import ComplianceHistory from "../components/ComplianceHistory"

import { useEffect, useState } from "react"

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null)

    const [servers, setServers] = useState([])

    const [selectedServer, setSelectedServer] =
        useState(null)

    useEffect(() => {

        fetch("http://127.0.0.1:5000/dashboard")
            .then((response) => response.json())
            .then((data) => {
                setDashboardData(data)
            })

        fetch("http://127.0.0.1:5000/servers")
            .then((response) => response.json())
            .then((data) => {

                setServers(data)

                if (data.length > 0) {

                    setSelectedServer(
                        data[0]
                    )

                }

            })

    }, [])

    if (!dashboardData) {
        return <h1 className="p-8">Loading...</h1>
    }
    return (
        <div className="flex-1 p-8 overflow-auto bg-gray-100">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">

                <div>

                    <h2 className="text-3xl font-bold">
                        Security Dashboard
                    </h2>

                    <select

                        value={
                            selectedServer?.ip || ""
                        }

                        onChange={(e) => {

                            const server =
                                servers.find(

                                    s =>
                                        s.ip === e.target.value

                                )

                            setSelectedServer(server)

                        }}

                        className="
                border
                rounded-lg
                px-4 py-2
                mt-3
                bg-white
            "
                    >

                        {
                            servers.map((server) => (

                                <option
                                    key={server.ip}
                                    value={server.ip}
                                >

                                    {server.name}

                                </option>

                            ))
                        }

                    </select>

                </div>

                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                    Start Scan
                </button>

            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">

                <DashboardCard
                    title="Total Servers"
                    value={dashboardData.total_servers}
                    color="text-gray-700"
                />

                <DashboardCard
                    title="Compliance Score"
                    value={`${dashboardData.compliance_score}%`}
                    color="text-green-600"
                />

                <DashboardCard
                    title="Active Alerts"
                    value={dashboardData.active_alerts}
                    color="text-red-600"
                />

                <DashboardCard
                    title="Risk Level"
                    value={dashboardData.risk_level}
                    color="text-yellow-600"
                />

            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-2 gap-6">

                <RecentAlerts />

                <ServerTable />

            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-2 gap-6 mt-8">

                <ComplianceChart
                    ip={selectedServer?.ip}
                />

                <MetricsChart
                    ip={selectedServer?.ip}
                />

            </div>

            <div className="mt-8 w-full">
                <ComplianceHistory
                    ip={selectedServer?.ip}
                />
            </div>

            <div className="mt-8">
                <MetricsHistory
                    ip={selectedServer?.ip}
                />
            </div>

        </div>
    )
}

export default Dashboard