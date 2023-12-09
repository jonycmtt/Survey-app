import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../../../Components/Hooks/useAuth";
import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
// import SectionHeader from "../../../../shared/Banner/SectionHeader";



const SurveyReport = () => {

  useEffect(() => {
    document.title = "Fimro | Survey Report";
  }, []);
  // const
  const data = useLoaderData();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const {title,email} = data;
  console.log(email)


  const handleReport = (event) => {
    event.preventDefault();
    const form = event.target;
    const userReport = form.feedbackMessage.value;

    const reportUser = {
        userReport ,
        reportUserEmail : user?.email,
        reportUserName : user?.displayName,
        userRole : 'userReport',
        surveyEmail : email,
        surveyTitle : title,
        
    }

    // feedback message 
    //    axiosSecure
    //   .patch(`/survey/reportUser/${_id}`, reportUser)
    //   .then((res) => {
    //     if (res.data.modifiedCount > 0) {
    //         Swal.fire({
    //           title: "Modified!",
    //           text: "Your file has been deleted.",
    //           icon: "success",
    //         });
    //         navigate(-1)
    //       }
    //   });
       axiosSecure
      .post('/feedback', reportUser)
      .then((res) => {
        if (res.data.insertedId) {
            Swal.fire({
              title: "Modified!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            navigate(-1)
          }
      });
  };
  return (
    <div className="max-w-6xl mx-auto my-20 px-3 xl:px-0">
     {/* <SectionHeader title={'Survey Report'} img="https://i.ibb.co/9ybkSMV/clipboard-6225718-1280.jpg"></SectionHeader> */}
      <div>
        <form onSubmit={handleReport}>
          <div className="form-control w-full">
            <label className="label">
              <span className="text-xl font-semibold ">Report:</span>
            </label>
            <textarea
              placeholder={`Write Feedback with ${title}`}
              name="feedbackMessage"
              className="input input-bordered resize-none h-52"
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Send Feedback</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyReport;
