import { useEffect, useState } from "react"

function Anomalies() {

  const [anomalyData, setAnomalyData] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    fetchAnomalies()

  }, [])


  const fetchAnomalies = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:5000/anomalies",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({

            ip: "172.22.95.106",

            username: "anjali1194",

            password: "anjali1194"

          })
        }
      )

      const data = await response.json()

      setAnomalyData(data)

    } catch (error) {

      console.log(error)

    }

    setLoading(false)
  }


  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8 !text-black">

        AI Anomaly Detection

      </h1>

      {loading && (

        <div className="bg-yellow-100 p-6 rounded-2xl">

          Loading anomaly analysis...

        </div>

      )}

      {anomalyData && (

        <div className="space-y-6">

          {/* STATUS CARD */}

          <div className="bg-white rounded-2xl shadow-md p-8">

            <div className="flex justify-between items-center">

              <div>

                <h2 className="text-2xl font-bold !text-black mb-2">

                  ML Detection Status

                </h2>

                <p className="text-gray-700">

                  {anomalyData.message}

                </p>

              </div>

              <div>

                <span
                  className={`
                                        px-6 py-3 rounded-xl text-white font-bold text-lg
                                        ${anomalyData.status ===
                      "ANOMALY"

                      ? "bg-red-600"

                      : "bg-green-600"
                    }
                                    `}
                >

                  {anomalyData.status}

                </span>

              </div>

            </div>

          </div>


          {/* METRICS */}

          <div className="grid grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h3 className="text-gray-500 text-lg mb-2">

                CPU Usage

              </h3>

              <p className="text-4xl font-bold text-blue-600">

                {anomalyData.cpu}%

              </p>

            </div>


            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h3 className="text-gray-500 text-lg mb-2">

                RAM Usage

              </h3>

              <p className="text-4xl font-bold text-purple-600">

                {anomalyData.ram}%

              </p>

            </div>


            <div className="bg-white p-6 rounded-2xl shadow-md">

              <h3 className="text-gray-500 text-lg mb-2">

                Disk Usage

              </h3>

              <p className="text-4xl font-bold text-orange-600">

                {anomalyData.disk}%

              </p>

            </div>

          </div>


          {/* SEVERITY */}

          <div className="bg-white p-6 rounded-2xl shadow-md">

            <h2 className="text-2xl font-bold mb-4 !text-black">

              Threat Severity

            </h2>

            <span
              className={`
                                px-6 py-3 rounded-xl text-white font-bold text-lg
                                ${anomalyData.severity ===
                  "HIGH"

                  ? "bg-red-600"

                  : "bg-green-600"
                }
                            `}
            >

              {anomalyData.severity}

            </span>

          </div>

        </div>

      )}

    </div>

  )
}

export default Anomalies