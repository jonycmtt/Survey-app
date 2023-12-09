import { Outlet } from "react-router-dom"
import Navbar from "../shared/Navbar/Navbar"
import Footer from "../shared/Footer/Footer"
import useAuth from "../Components/Hooks/useAuth"
// import useAuth from "../Components/Hooks/useAuth"

const Main = () => {
  // const {loading} = useAuth()
  // if(loading) {
  //   return <span>loading...</span>
  // }
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Main
