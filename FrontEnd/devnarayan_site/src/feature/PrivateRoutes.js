import { Navigate, Outlet } from "react-router-dom"

const privateRoutes = () => {

    const localUser = JSON.parse(localStorage.getItem("user"));
    let auth = { 'token': localUser===null ? false : true }
    return (
        auth.token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default privateRoutes;