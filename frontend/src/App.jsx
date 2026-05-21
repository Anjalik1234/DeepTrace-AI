import { Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"

import Dashboard from "./pages/Dashboard"
import Servers from "./pages/Servers"
import Compliance from "./pages/Compliance"
import Anomalies from "./pages/Anomalies"
import AIInsights from "./pages/AIInsights"

function App() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      {/* Fixed Sidebar */}
      <div className="w-72 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/servers" element={<Servers />} />

          <Route path="/compliance" element={<Compliance />} />

          <Route path="/anomalies" element={<Anomalies />} />

          <Route path="/ai-insights" element={<AIInsights />} />

        </Routes>

      </div>

    </div>
  )
}

export default App