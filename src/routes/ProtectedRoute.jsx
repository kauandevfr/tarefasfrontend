import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../providers/userContext";
import LoaderPage from "../components/LoadingPage";

export function PrivateRoute() {
    const { isAuthenticated } = useUser();
    if (isAuthenticated === true) return <LoaderPage />;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export function GuestRoute() {
    const { isAuthenticated } = useUser();
    if (isAuthenticated === false) return <LoaderPage />;
    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
}