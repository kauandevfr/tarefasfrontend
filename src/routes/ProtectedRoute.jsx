import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../providers/userContext";
import LoaderPage from "../components/LoadingPage";

export function PrivateRoute() {
    const { isAuthenticated } = useUser();
    if (isAuthenticated === null) return <LoaderPage />;
    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
}

export function GuestRoute() {
    const { isAuthenticated } = useUser();
    if (isAuthenticated === null) return <LoaderPage />;
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}