import { Navigate } from 'react-router-dom';
import { getTokenFromLocalStorage } from '../../helpers/localstorage.ts'

export const ProtectedRoute = ({ children }) => {
    const isAuth = getTokenFromLocalStorage("token");
    return isAuth ? children  : <Navigate to={"/register"} replace/>
}