import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../firebase";

export default function WithoutAuth() {
  const [user, loading, error] = useAuthState(auth);

  if (user) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}
