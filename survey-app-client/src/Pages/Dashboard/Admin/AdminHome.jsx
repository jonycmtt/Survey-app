import { useEffect } from "react";
import useAdmin from "../../../Components/Hooks/useAdmin";
import useAuth from "../../../Components/Hooks/useAuth";

const AdminHome = () => {
  useEffect(() => {
    document.title = "Fimro | Admin";
  }, []);
  const { user } = useAuth();
  // const [isAdmin] = useAdmin()
  return (
    <div>
      <h2 className="text-2xl md:text-4xl font-semibold text-center">Admin Home</h2>
      <div className="max-w-lg mx-auto border p-10 rounded-lg flex flex-col gap-6 justify-center items-center my-5 text-center">
        <img className="lg:w-52 lg:h-52 rounded-full" src={user?.photoURL} alt="" />
        <div>
          <p className="text-2xl font-semibold">{user?.displayName}</p>
          <p>Email : {user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
