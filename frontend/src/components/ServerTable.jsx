function ServerTable() {
  const servers = [
    {
      id: 1,
      name: "Production-1",
      status: "Secure",
      risk: "Low",
    },

    {
      id: 2,
      name: "Database-Server",
      status: "Warning",
      risk: "Medium",
    },

    {
      id: 3,
      name: "Auth-Server",
      status: "Critical",
      risk: "High",
    },
  ]

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold mb-6 text-black">
        Server Status
      </h2>

      <table className="w-full">

        <thead>
          <tr className="text-left border-b border-gray-300">

            <th className="pb-3 text-gray-800">
              Server
            </th>

            <th className="pb-3 text-gray-800">
              Status
            </th>

            <th className="pb-3 text-gray-800">
              Risk
            </th>

          </tr>
        </thead>

        <tbody>

          {servers.map((server) => (
            <tr
              key={server.id}
              className="border-b border-gray-200"
            >

              <td className="py-4 text-gray-700 font-medium">
                {server.name}
              </td>

              <td
                className={`
                  py-4 font-semibold
                  ${
                    server.status === "Secure"
                      ? "text-green-600"
                      : server.status === "Warning"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                `}
              >
                {server.status}
              </td>

              <td
                className={`
                  py-4 font-bold
                  ${
                    server.risk === "Low"
                      ? "text-green-600"
                      : server.risk === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }
                `}
              >
                {server.risk}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default ServerTable