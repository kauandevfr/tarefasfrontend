import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import User from "../pages/User";

export default function MainRoutes() {
    return (
        <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-settings" element={<User />} />

        </Routes>
    )
}