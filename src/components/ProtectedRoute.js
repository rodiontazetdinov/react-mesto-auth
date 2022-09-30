import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ loginCheck }) => {
    
    return (
          loginCheck ? <Outlet/> : <Navigate to="/sign-in" />
    );
  };
  
  export default ProtectedRoute; 