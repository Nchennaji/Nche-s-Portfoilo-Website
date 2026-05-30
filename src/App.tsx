/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { AuthProvider } from "./lib/AuthContext";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <Router>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
            <WhatsAppButton />
            <ScrollToTop />
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
