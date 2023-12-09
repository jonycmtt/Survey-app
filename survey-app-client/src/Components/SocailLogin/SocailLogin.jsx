import { FaGoogle } from "react-icons/fa"
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import useAuth from "../Hooks/useAuth";

const SocailLogin = () => {
  const {googleSignIn} = useAuth();
  const location = useLocation();
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic()

  const handleGoogleLogin = () => {
    googleSignIn()
    .then(result => {
      console.log(result.user)
      navigate(from, { replace: true });
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
        role : 'user'
      }
      axiosPublic.post("/users", userInfo)
      .then(res => {
        console.log(res.data)
      })
    }).catch(error => {
      console.log(error.message)
    })
  }
  return (
    <div>
      <div className="text-center my-8">
        <button onClick={handleGoogleLogin} className="btn btn-neutral">
            <FaGoogle></FaGoogle>
            <span>Login with Google</span>
        </button>
      </div>
    </div>
  )
}

export default SocailLogin
