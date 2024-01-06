import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { SiSurveymonkey } from "react-icons/si";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import { useEffect } from "react";

const ManageUsers = () => {
  useEffect(() => {
    document.title = "Fimro | Manage Users";
  }, []);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {logout} = useAuth()
  
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

   // interceptor 401 and 403 status
   axiosSecure.interceptors.response.use(function(response) {
    return response;
  }, async (error) => {
    const status = error.response.status
    // console.log('status error in the interceptor', status)
    if(status === 401 || status === 403){
      await logout();
      navigate('/login')
    }
    return Promise.reject(error)
  })

  const { data: paymentList = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });

  console.log('payments', paymentList)

  // make admin
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Modify it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Modified!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  // make Survey
  const handleMakeSurvey = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Modify it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/surveyor/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Modified!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // delete user
  const handleDelete = user => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/users/${user._id}`).then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              refetch()
            }
          });
        }
      });
};
  

  return (
    <div>
      <div className="flex justify-around">
        <h2 className="text-2xl font-semibold mb-6">Manage Users </h2>
        <h2 className="text-2xl font-semibold ">
          Total Users : {users.length}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, indx) => (
              <tr key={user._id}>
                <th>{indx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="flex flex-col xl:flex-row items-center gap-4 w-auto">
                    
                    {user.role === "admin" ? (
                     <button
                       className="flex btn btn-xs items-center btn-success text-white uppercase"
                     >
                       <FaUser />
                       Admin
                       <FaCheckCircle></FaCheckCircle>
                     </button>
                    ) : (
                      <button
                      onClick={() => handleMakeAdmin(user)} 
                        className="flex btn btn-xs items-center uppercase"
                      >
                        <FaUser />
                        Admin
                      </button>
                    )}
                    


                    {user.role === "surveyor" ? (
                       <button className="flex btn btn-xs items-center btn-success text-white uppercase">
                       <SiSurveymonkey />
                       Surveyor
                       <FaCheckCircle></FaCheckCircle>
                     </button>
                    ) : (
                      <button onClick={() => handleMakeSurvey(user)} className="flex btn btn-xs items-center  uppercase">
                        <SiSurveymonkey />
                        Surveyor
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  <div className="w-32">
                    <button onClick={() => handleDelete(user)}  className="flex btn btn-xs items-center btn-error text-white uppercase">
                      <MdDelete className="cursor-pointer " />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {/* {paymentList.map((user, indx) => (
              <tr key={user._id}>
                <th>{indx + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-info btn-xs">{user.status}</button>
                </td>
                <td>
                  <div>
                    <button onClick={() => handleDelete(user)}  className="flex btn btn-xs items-center btn-error text-white uppercase">
                      <MdDelete className="cursor-pointer " />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
