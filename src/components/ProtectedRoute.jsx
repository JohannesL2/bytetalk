import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const isTokenPresent = localStorage.getItem('jwt');

    if (isTokenPresent === null) {
      return <Navigate to="/" replace/>
    }

  return <Outlet/>;
};

export default ProtectedRoute;