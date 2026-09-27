import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Overview from "./pages/Overview";
import LiveMap from "./pages/LiveMap";
import SensorData from "./pages/SensorData";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/live-map" element={<LiveMap />} />
            <Route path="/sensor-data" element={<SensorData />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;