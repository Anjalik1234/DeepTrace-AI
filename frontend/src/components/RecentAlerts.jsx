function RecentAlerts() {
  const alerts = [
    {
      id: 1,
      issue: "SSH Root Login Enabled",
      severity: "High",
    },

    {
      id: 2,
      issue: "Firewall Disabled",
      severity: "Critical",
    },

    {
      id: 3,
      issue: "High CPU Usage",
      severity: "Medium",
    },
  ]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold mb-6 text-black">
        Recent Alerts
      </h2>

      <div className="space-y-4">

        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex justify-between items-center border-b border-gray-200 pb-3"
          >

            <p className="text-gray-800 font-medium">
              {alert.issue}
            </p>

            <span
              className={`
                font-bold
                ${
                  alert.severity === "Critical"
                    ? "text-red-600"
                    : alert.severity === "High"
                    ? "text-orange-500"
                    : "text-yellow-500"
                }
              `}
            >
              {alert.severity}
            </span>

          </div>
        ))}

      </div>

    </div>
  )
}

export default RecentAlerts