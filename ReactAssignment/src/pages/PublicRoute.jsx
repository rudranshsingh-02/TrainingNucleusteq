import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
        return <Navigate to="/private" replace />;
    }
    return children;
};
export default PublicRoute;