import Swal from "sweetalert2";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useSurveyCreation from "../../../Components/Hooks/useSurveyCreation";
import { Link } from "react-router-dom";
import { useEffect } from "react";


const SurveyRequest = () => {
  useEffect(() => {
    document.title = "Fimro | Survey Request";
  }, []);

  const [ownSurvey, refetch] = useSurveyCreation();
  const axiosSecure = useAxiosSecure();

  const handlePublish = (id) => {
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
        axiosSecure.patch(`/survey/published/${id}`).then((res) => {
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-10">Survey Request</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {ownSurvey.map((items) => (
          <div key={items._id} className="card bg-neutral text-neutral-content">
            <div className="card-body text-center">
              <h2 className="capitalize text-center text-xl font-semibold">
                {items.title}
              </h2>
              <p className="text-slate-400 mb-2">{items.description}</p>
              <div className="text-left flex">
                <h2 className="font-bold">
                  Category :{" "}
                  <span className="text-slate-400 font-bold">
                    {items.category}
                  </span>
                </h2>
              </div>

              <div className="flex items-center justify-center gap-4 mt-4">
                {items.role === "published" ? (
                  <button
                    disabled
                    className="btn-sm btn uppercase disabled:bg-slate-500 disabled:text-slate-400"
                  >
                    Publish
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublish(items._id)}
                    className="btn-sm btn btn-success uppercase"
                  >
                    Publish
                  </button>
                )}
                {/* <button
                  onClick={() => handlePublish(items._id)}
                  className="btn-sm btn btn-success uppercase"
                >
                  Publish
                </button> */}
                {items.role === "unPublished" ? (
                  <button
                    disabled
                    className="btn-sm btn uppercase disabled:bg-slate-500 disabled:text-slate-400"
                  >
                    unpublish
                  </button>
                ) : (
                  <Link to={`/dashboard/feedback/${items._id}`}>
                    <button
                      //
                      className="btn-sm btn btn-error uppercase"
                    >
                      unpublish
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyRequest;
