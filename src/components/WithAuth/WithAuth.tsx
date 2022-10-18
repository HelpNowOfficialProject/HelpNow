import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";
import Header from "../Header/Header";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function WithAuth() {
    const [user, loading, error] = useAuthState(auth);

    if (loading) {
        return <LoadingPage />;
    } else if (!user) {
        return <Navigate to="/auth/login" />;
    } else
        return (
            <>
                <Header />
                <Outlet />
            </>
        );
}
