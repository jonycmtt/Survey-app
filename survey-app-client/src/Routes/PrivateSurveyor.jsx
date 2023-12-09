import useAuth from '../Components/Hooks/useAuth'
import useSurveyor from '../Components/Hooks/useSurveyor'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateSurveyor = ({children}) => {
    const {user,loading} = useAuth()
    const [isSurveyor,isSurveyorLoading] = useSurveyor()
    const location = useLocation()

    if(loading || isSurveyorLoading) {
        return <span>loading...</span>
    }
    if(user && isSurveyor)  { 
        return children
    }
  return <Navigate to='/' state={{from :location}} replace></Navigate>
}

export default PrivateSurveyor
