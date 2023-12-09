import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Components/Hooks/useAuth";
import useAxiosPublic from "../Components/Hooks/useAxiosPublic";
import SocailLogin from "../Components/SocailLogin/SocailLogin";
import { Formik, useFormik } from "formik";
import { signupValidation } from "./signupValidation";
import { useEffect, useState } from "react";
const initialValues = {
  name : '',
  photoUrl : '',
  email : '',
  password: '',
  role : 'user'
}
const Register = () => {

  useEffect(() => {
    document.title = "Fimro | Register User";
  }, []);

  const {createUser,updateUserProfile} = useAuth();
  const axiosPublic = useAxiosPublic()
  const navigate = useNavigate()
  // const [loadForm,setLoadForm] = useState(true)

  // if(loading) {
  //   return <div>Loading...</div>
  // }
  // form validation
  const {values,handleBlur,handleChange,handleSubmit,errors} = useFormik({
    initialValues : initialValues,
    validationSchema : signupValidation,
    onSubmit:(values) =>{
      console.log(values)

      createUser(values.email,values.password)
    .then(result => {
        updateUserProfile(values.name,values.photoUrl)
        .then(() => {
         axiosPublic.post('/users' , values)
         .then(res => {
          console.log(res.data)
          if(res.data.insertedId) {
            console.log('profile updated');
            navigate('/')
            // setLoading(false)
          }
         })
 
        }).catch((error) => {
         console.log(error.message)
        });
        const user = result.user;
        console.log(user)
      }).catch(error => {
        console.error(error.message)
      })
    }
  })

  // const handleRegister = (event) => {
  //   event.preventDefault();

  //   const form = event.target;
  //   const email = form.email.value;
  //   const password = form.password.value;
  //   const name = form.name.value;
  //   const photoUrl = form.photoUrl.value;
  //   console.log(name, password, email, photoUrl);
  //   const userInfo = {
  //     name : name,
  //     email: email
  //   }
  //   createUser(email,password)
  //   .then(result => {
  //       updateUserProfile(name,photoUrl)
  //       .then(() => {
  //        axiosPublic.post('/users' , userInfo)
  //        .then(res => {
  //         console.log(res.data)
  //         if(res.data.insertedId) {
  //           console.log('profile updated');
  //           navigate('/')
  //         }
  //        })
 
  //       }).catch((error) => {
  //        console.log(error.message)
  //       });
  //       const user = result.user;
  //       console.log(user)
  //     }).catch(error => {
  //       console.error(error.message)
  //     })
  // };
  return (
    <div>
      <div className="card w-full mx-auto max-w-xl shadow-2xl bg-base-100">
        <h2 className="text-2xl text-center font-bold py-5">Please Login</h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
           
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
           
            />
            <br />
            {errors.name && <small className="text-red-500">{errors.name}</small>}
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <input
           
              name="name"
              type="text"
              readOnly 
              disabled
              placeholder="Your Name"
              className="input input-bordered"
              value={values.role}
           
            />
            <br />
            {errors.name && <small className="text-red-500">{errors.name}</small>}
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">PhotoUrl</span>
            </label>
            <input
           
              name="photoUrl"
              type="text"
              placeholder="Your PhotoUrl"
              className="input input-bordered"
              value={values.photoUrl}
              onBlur={handleBlur}
              onChange={handleChange}
              
            />
             {errors.photoUrl && <small className="text-red-500">{errors.photoUrl}</small>}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
          
              name="email"
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              
            />
             {errors.email && <small className="text-red-500">{errors.email}</small>}
             
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
          
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.password && <small className="text-red-500">{errors.password}</small>}
          </div>
          <div className="form-control mt-6">
            {/* <button disabled={disabled} type='submit' className="btn btn-primary">Login</button> */}
            <input type="submit" value="Register" className="btn btn-primary" />
          </div>
        </form>
        <span className="text-center py-6">
          Already Have a Account? Please{" "}
          <Link className="text-green-500" to="/login">
            Login
          </Link>
        </span>
        <SocailLogin></SocailLogin>
      </div>
    </div>
  );
};

export default Register;
