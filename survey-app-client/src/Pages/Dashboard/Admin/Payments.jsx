import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Payments = () => {
  useEffect(() => {
    document.title = "Fimro | Payments List";
  }, []);

  const axiosSecure = useAxiosSecure();
  const { data: paymentList = [], refetch } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  // const email = paymentList.map(find => )
  const handleChangeStatus = (id) => {
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
        axiosSecure.patch(`/payments/status/${id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Modified!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });

        // axiosSecure.patch(`/users/proUser/${email}`)
        // .then(res => {
        //   console.log(res.data)
        // })
      }
    });
  }
  console.log(paymentList);
  return (
    <div>
      <h2 className="text-2xl font-semibold">Payments List</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Price</th>
              <th>TransactionId</th>
              <th>Date</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {paymentList.map((pay,idt) => (
              <tr key={pay._id} className="bg-base-200">
                <th>{idt+1}</th>
                <td>{pay.email}</td>
                <td>{pay.price}$</td>
                <td>{pay.transactionId}</td>
                <td>{pay.date}</td>
                <td className="w-32">
                  {
                    pay.status === 'Pro User' ? 
                    <button className="btn cursor-text btn-success text-white btn-xs uppercase w-20">{pay.status}</button>
                    :
                    <button onClick={()=> handleChangeStatus(pay._id,pay.email)} className="btn btn-info text-white btn-xs uppercase w-20">{pay.status}</button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
