import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAuth from "../../Components/Hooks/useAuth";
import useAdmin from "../../Components/Hooks/useAdmin";
import useSurveyor from "../../Components/Hooks/useSurveyor";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isAdmin] = useAdmin()
  const [isSurveyor] = useSurveyor()
  // console.log(isAdmin)

  const handleLogOut = () => {
    logout()
      .then(() => {
        console.log("LogOut User");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/surveys">Surveys</NavLink>
      </li>
      <li>
        <NavLink to="/proUser">Pro-User</NavLink>
      </li>
{/* 
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )} */}
      {
        user && isAdmin && 
        <li>
        <NavLink to="/dashboard/adminHome">Dashboard</NavLink>
      </li>
      }
      {
        user && isSurveyor && <li>

        <NavLink to="/dashboard/surveyHome">Dashboard</NavLink>
     
      </li>
      }
    </>
  );
  return (
    <div className="max-w-7xl mx-auto">
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/" className="text-xl flex font-bold uppercase">
            <img src={logo} alt="logo" />
            <span>Fimro.</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL}
                    alt="photo"
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
          ) : (
            <Link to="/login">
              <button className="btn btn-neutral">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
