import { useEffect, useState } from "react";
import useAuth from "../../../Components/Hooks/useAuth";
import useSurveyCreation from "../../../Components/Hooks/useSurveyCreation";
import MySurveyItems from "./MySurveyItems";
import { FaBell } from "react-icons/fa";
import moment from "moment";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MySurvey = () => {
  useEffect(() => {
    document.title = "Fimro | My Survey";
  }, []);

  const [ownSurvey, refetch] = useSurveyCreation();
  const [ownSurveyData, setOwnSurveyData] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const notificationDate = moment().format("MMM Do YY")
  useEffect(() => {
    const ownData = ownSurvey.filter((data) => data.email === user?.email);
    setOwnSurveyData(ownData);
  }, [ownSurvey, user?.email]);
  // console.log(ownSurvey);
  const {data : userReportFeed = []} = useQuery({
    queryKey: ['userReports'],
    queryFn: async ()=>{
      const res = await axiosSecure.get('/feedback');
      return res.data;
    }
  })
  console.log(userReportFeed)
  const myUserReport = userReportFeed.filter(reportUser => reportUser.surveyEmail === user?.email)
  console.log(myUserReport)

  return (
    <div>
      <div className="mb-10 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Survey</h2>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer">
            <button
              className="text-white btn btn-sm btn-success"
              onClick={() => document.getElementById("my_modal_2").showModal()}
            >
              {" "}
              <FaBell></FaBell> Report User
            </button>
          </div>
          <div className="relative cursor-pointer">
            <button
              className="text-white btn btn-sm btn-success"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              {" "}
              <FaBell></FaBell> Admin
            </button>
          </div>
        </div>
        {/* admin feedback */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h2 className="font-bold text-center">Admin FeedBack :</h2>
            {ownSurveyData
              .filter((item) => item.role === "unPublished")
              ?.map((message) => (
                <div
                  className="border shadow rounded-lg p-4 my-3 text-left"
                  key={message._id}
                >
                  {message?.role === "unPublished" && (
                    <div>
                      <div className="flex justify-between items-center">
                        <h3>
                          <span className="font-semibold">Survey</span> :{" "}
                          {message?.title}
                        </h3>
                        <span className="text-xs font-bold">
                          {notificationDate}
                        </span>
                      </div>
                      <p className="text-slate-500">
                        <span className="font-semibold">FeedBack</span> :{" "}
                        {message?.adminMessage}
                      </p>
                      <h2 className="my-2 text-xs btn btn-xs btn-primary">
                        <span className="font-semibold">Admin</span> :{" "}
                        {message?.adminName}
                      </h2>
                    </div>
                  )}
                </div>
              ))}
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* user feedback */}
        <dialog id="my_modal_2" className="modal text-left">
          <div className="modal-box">
            <h2 className="font-bold text-center">User FeedBack :</h2>
            {myUserReport
              .filter((item) => item.userRole === "userReport")
              ?.map((message) => (
                <div
                  className="border shadow rounded-lg p-4 my-3"
                  key={message._id}
                >
                  {message?.userRole === "userReport" && (
                    <div>
                      <div className="flex justify-between items-center">
                        <h3>
                          <span className="font-semibold">Survey</span> :{" "}
                          {message?.surveyTitle}
                        </h3>
                        <span className="text-xs font-bold">
                          {notificationDate}
                        </span>
                      </div>
                      <p className="text-slate-500">
                        <span className="font-semibold">FeedBack</span> :{" "}
                        {message?.userReport}
                      </p>
                      <h2 className="my-2 text-xs btn btn-xs btn-primary">
                        <span className="font-semibold">User</span> :{" "}
                        {message?.reportUserName}
                      </h2>
                    </div>
                  )}
                </div>
              ))}
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ownSurveyData?.map((items) => (
          <MySurveyItems items={items} key={items._id}></MySurveyItems>
        ))}
      </div>
    </div>
  );
};

export default MySurvey;
