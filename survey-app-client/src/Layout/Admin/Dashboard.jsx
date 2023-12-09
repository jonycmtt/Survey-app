import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import logo from "../../assets/logo.png";
import useAuth from "../../Components/Hooks/useAuth";
import useAdmin from "../../Components/Hooks/useAdmin";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isAdmin] = useAdmin();
  const navigate = useNavigate()
  // if(loading) {
  //   return <span>Loading...</span>
  // }
  const handleLogOut = () => {
    logout()
      .then(() => {
        console.log("LogOut User");
        navigate('/')
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="flex justify-between max-w-6xl sm:w-full mx-auto py-2">
        <Link to="/" className="text-xl flex items-center font-bold uppercase">
          <img src={logo} alt="logo" />
          <span>Fimro.</span>
        </Link>
        <div className="">
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">{user?.displayName}</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <span onClick={handleLogOut}>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="lg:flex">
        <div className="drawer lg:drawer-open max-w-md flex-1 shadow z-50">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center absolute">
            {/* Page content here */}
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <FaBars></FaBars>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            {/* <div className="text-2xl text-center my-6">
              <h2>Dashboard</h2>
            </div> */}
            <ul className="menu p-4 py-10 w-72 min-h-full bg-base-200 text-base-content text-lg">
              {isAdmin ? (
                <>
                  {/* Sidebar content here */}
                  <li>
                    <NavLink to="/dashboard/adminHome"> Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageUsers"> Manage Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/surveyRequest">
                      Survey Request
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/payments">Payments List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/adminResponse">
                      Response Survey
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {/* Sidebar content here */}
                  <li>
                    <NavLink to="/dashboard/surveyHome"> Home</NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/surveyCreation"> Creation</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/mySurvey"> My Survey</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/response">Response</NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className=" w-full px-3 text-center lg:p-12 min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
