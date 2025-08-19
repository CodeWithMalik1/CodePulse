import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Navbar from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";

// Context
import { AuthProvider } from "./components/context/AuthContext";
import { DataProvider } from "./components/context/DataContext";

// Pages
import { Dashboard } from "./components/pages/Dashboard";
import { Problems } from "./components/pages/Problems";
import ProblemDetail from "./components/pages/ProblemDetail";
import { Contests } from "./components/pages/Contests";
import { ContestDetail } from "./components/pages/ContestDetail";
import { Discussion } from "./components/pages/Discussion";
import { Register } from "./components/pages/auth/Register";
import { AdminPanel } from "./components/pages/admin/AdminPanel";
import { Login } from "./components/pages/auth/Login";

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="flex h-screen bg-gray-900 text-white">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Navbar />
              <main className="flex-1 p-4 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/problems" element={<Problems />} />
                  <Route path="/problems/:id" element={<ProblemDetail />} />
                  <Route path="/discussion" element={<Discussion />} />
                  <Route path="/contests" element={<Contests />} />
                  <Route path="/contests/:id" element={<ContestDetail />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
