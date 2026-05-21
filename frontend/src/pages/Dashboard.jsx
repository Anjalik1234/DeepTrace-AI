import DashboardCard from "../components/DashboardCard"
import RecentAlerts from "../components/RecentAlerts"
import ServerTable from "../components/ServerTable"
import ComplianceChart from "../charts/ComplianceChart"
import ThreatChart from "../charts/ThreatChart"

function Dashboard() {
    return (
        <div className="flex-1 p-8 overflow-auto bg-gray-100">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">

                <h2 className="text-3xl font-bold">
                    Security Dashboard
                </h2>

                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
                    Start Scan
                </button>

            </div>

            {/* Top Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">

                <DashboardCard
                    title="Total Servers"
                    value="12"
                    color="text-gray-700"
                />

                <DashboardCard
                    title="Compliance Score"
                    value="87%"
                    color="text-green-600"
                />

                <DashboardCard
                    title="Active Alerts"
                    value="5"
                    color="text-red-600"
                />

                <DashboardCard
                    title="Risk Level"
                    value="Medium"
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

                <ComplianceChart />

                <ThreatChart />

            </div>

        </div>
    )
}

export default Dashboard