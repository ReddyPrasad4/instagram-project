import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    let userName = localStorage.getItem("userName");
  return (
    <div>
        {userName? <Outlet/> :<Navigate to="/" />}
    </div>
  )
}

export default ProtectedRoute