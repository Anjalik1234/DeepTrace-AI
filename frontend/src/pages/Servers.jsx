import { useEffect, useState } from "react"

function Servers() {

    const [servers, setServers] = useState([])

    const [name, setName] = useState("")

    const [ip, setIp] = useState("")


    // Fetch servers
    useEffect(() => {

        fetch("http://127.0.0.1:5000/servers")
            .then((response) => response.json())
            .then((data) => {
                setServers(data)
            })

    }, [])


    // Add server
    const handleAddServer = async () => {

        const response = await fetch(
            "http://127.0.0.1:5000/servers",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name,
                    ip,
                }),
            }
        )

        const data = await response.json()

        setServers([...servers, data.server])

        setName("")
        setIp("")
    }


    return (
        <div className="p-2 w-full min-h-screen bg-gray-100 text-black">

            {/* Page Title */}
            <h1 className="text-4xl font-bold mb-8 !text-black">
                Servers
            </h1>

            {/* Add Server Form */}
            <div className="bg-white p-6 rounded-2xl shadow-md mb-8">

                <h2 className="text-2xl font-semibold mb-6 !text-black">
                    Add New Server
                </h2>

                <div className="flex gap-4 flex-wrap">

                    <input
                        type="text"
                        placeholder="Server Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="
            border border-gray-300
            p-3 rounded-lg
            flex-1 min-w-[250px]
            outline-none
            focus:ring-2 focus:ring-blue-500
          "
                    />

                    <input
                        type="text"
                        placeholder="Server IP"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        className="
            border border-gray-300
            p-3 rounded-lg
            flex-1 min-w-[250px]
            outline-none
            focus:ring-2 focus:ring-blue-500
          "
                    />

                    <button
                        onClick={handleAddServer}
                        className="
            bg-black text-white
            px-8 py-3
            rounded-lg
            hover:bg-gray-800
            transition
          "
                    >
                        Add
                    </button>

                </div>
            </div>

            {/* Server Table */}
            <div className="bg-white p-6 rounded-2xl shadow-md">

                <h2 className="text-2xl font-semibold mb-6 !text-black">
                    Monitored Servers
                </h2>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>
                            <tr className="border-b text-left text-gray-700">

                                <th className="pb-4 text-lg">Name</th>

                                <th className="pb-4 text-lg">IP Address</th>

                                <th className="pb-4 text-lg">Status</th>

                            </tr>
                        </thead>

                        <tbody>

                            {servers.map((server) => (

                                <tr
                                    key={server.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >

                                    <td className="py-5 text-gray-800 font-medium">
                                        {server.name}
                                    </td>

                                    <td className="py-5 text-gray-700">
                                        {server.ip}
                                    </td>

                                    <td className="py-5">

                                        <span className="
                    bg-green-100
                    text-green-700
                    px-3 py-1
                    rounded-full
                    text-sm
                    font-semibold
                  ">
                                            {server.status}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    )
}

export default Servers