import { Navigate, useLocation } from "react-router-dom"
import useAdmin from "../Components/Hooks/useAdmin"
import useAuth from "../Components/Hooks/useAuth"


const PrivateAdmin = ({children}) => {
    const {user,loading} = useAuth()
    const [isAdmin,isAdminLoading] = useAdmin()
    const location = useLocation()

    if(loading || isAdminLoading) {
        return <span>loading...</span>
    }
    if(user && isAdmin)  { 
        return children
    }
  return <Navigate to='/' state={{from :location}} replace></Navigate>
  
}

export default PrivateAdmin
