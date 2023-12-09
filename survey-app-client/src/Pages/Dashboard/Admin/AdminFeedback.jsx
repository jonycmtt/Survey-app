import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";

const AdminFeedback = () => {

  useEffect(() => {
    document.title = "Fimro | Admin Feedback";
  }, []);

  const data = useLoaderData();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const {title,_id} = data;

  const handleAdminFeedback = (event) => {
    event.preventDefault();
    const form = event.target;
    const adminFeedbackMessage = form.feedbackMessage.value;

    const feedBackAdmin = {
        adminFeedbackMessage ,
        adminEmail : user?.email,
        adminName : user?.displayName
    }
    // unpublished
    console.log(feedBackAdmin,_id)
     axiosSecure.patch(`/survey/unPublished/${_id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Modified!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        navigate('/dashboard/surveyRequest')
      }
    });

    // feedback message 
       axiosSecure
      .patch(`/survey/${_id}`, feedBackAdmin)
      .then((res) => {
        console.log(res.data)
      });
  };
  return (
    <div>
      <form onSubmit={handleAdminFeedback}>
        <div className="form-control w-full">
          <label  className="label">
            <span className="text-xl font-semibold ">Feedback:</span>
          </label>
          <textarea placeholder={`Write Feedback with ${title}`} name="feedbackMessage" className="input input-bordered resize-none h-52"></textarea>
        </div>
        <div className="form-control mt-6">
              <button className="btn btn-primary">Send Feedback</button>
            </div>
      </form>
    </div>
  );
};

export default AdminFeedback;
