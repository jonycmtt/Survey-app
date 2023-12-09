import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../Components/Hooks/useAuth";
import SocailLogin from "../Components/SocailLogin/SocailLogin";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Fimro | Login User";
  }, []);

    const {signIn} = useAuth();
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";
    
    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email,password)
    
        signIn(email,password)
        .then(() => {
          console.log('success login')
          navigate(from, { replace: true });
        }).catch(error => console.log(error.message))
    }
  return (
    <div>
      <div className="card w-full mx-auto max-w-xl shadow-2xl bg-base-100">
          <h2 className='text-2xl text-center font-bold py-5'>Please Login</h2>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
              name='email'
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
              name='password'
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              {/* <button disabled={disabled} type='submit' className="btn btn-primary">Login</button> */}
              <input type="submit" value='Login' className="btn btn-primary" />
            </div>
          </form>
          <span className="text-center py-6">New Here?Create a account. Please <Link className="text-green-500" to='/register'>Register</Link></span>
          <SocailLogin></SocailLogin>
        </div>
    </div>
  )
}

export default Login
