import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import TestNav from "./TestNav";


export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log(user)

  if (!user) {
    console.log(user)
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children ;
};