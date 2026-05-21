import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <div className="h-screen w-72 bg-gradient-to-b from-black to-gray-900 text-white p-5 fixed">

      <h1 className="text-2xl font-bold mb-10">
        DeepTrace AI
      </h1>

      <ul className="space-y-4">

        <li>
          <Link
            to="/"
            className="hover:text-blue-400 transition duration-200"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/servers"
            className="hover:text-blue-400 transition duration-200"
          >
            Servers
          </Link>
        </li>

        <li>
          <Link
            to="/compliance"
            className="hover:text-blue-400 transition duration-200"
          >
            Compliance
          </Link>
        </li>

        <li>
          <Link
            to="/anomalies"
            className="hover:text-blue-400 transition duration-200"
          >
            Anomalies
          </Link>
        </li>

        <li>
          <Link
            to="/ai-insights"
            className="hover:text-blue-400 transition duration-200"
          >
            AI Insights
          </Link>
        </li>

      </ul>

    </div>
  )
}

export default Sidebar