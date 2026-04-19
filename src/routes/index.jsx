import { Route, Routes } from "react-router-dom";
import { PrivateRoute, GuestRoute } from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import User from "../pages/User";
import ForgotPassword from "../pages/ForgotPassword";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import ResetPassword from "../pages/ResetPassword";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfUse from "../pages/TermsOfUse";

export default function MainRoutes() {
    return (
        <Routes>
            {/* 🔒 Só logados */}
            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user-settings" element={<User />} />
            </Route>

            {/* 🚫 Só deslogados */}
            <Route element={<GuestRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />
            </Route>

            {/* 🌐 Qualquer um */}
            <Route path="/forgot-pass" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfUse />} />
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}