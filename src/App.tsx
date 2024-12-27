import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ReposPage from "./pages/ReposPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Suspense } from "react";
import { Loader } from "lucide-react";

function App() {
  return (
    <div>
        <Suspense fallback={<Loader />}>
          <Navbar />
          <Toaster richColors position="bottom-right" />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/repos"
              element={
                <ProtectedRoute>
                  <ReposPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
    </div>
  );
}

export default App;
