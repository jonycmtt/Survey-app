import { FaBell, FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const MySurveyItems = ({ items }) => {
  const {
    title,
    description,
    category,
    like,
    dislike,
    timeFormate,
    _id,
    adminName,
    adminMessage,
    role,
  } = items;

  return (
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body text-center">
        <h2 className="capitalize text-center text-xl font-semibold">
          {title}
        </h2>
        <p className="text-slate-400 mb-2">{description}</p>
        <div className="text-left flex">
          <h2 className="font-bold">
            Category :{" "}
            <span className="text-slate-400 font-bold">{category}</span>
          </h2>
        </div>
        {/* <div className="flex justify-around mt-2">
            <div className="flex items-center gap-2">
              <FaThumbsUp></FaThumbsUp>
              <span>{like}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaThumbsDown className="mt-1"></FaThumbsDown>
              <span>{dislike}</span>
            </div>
        </div> */}

        <div className="flex items-center justify-center gap-4 mt-4">
          {role === "published" ? (
            <button className="btn-sm btn btn-success uppercase">
              published
            </button>
          ) : role === "unPublished" ? (
            <div className="flex items-center gap-2">
              <button className="btn-sm btn btn-error uppercase">
                unPublished
              </button>
              {/* <button
                className="btn btn-sm"
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
              >
                Admin Message
              </button> */}
            </div>
          ) : (
            <button className="btn-sm btn btn-info uppercase">Pending</button>
          )}
          <Link to={`/dashboard/update/${_id}`}>
            <button className="btn btn-danger btn-sm">Update</button>
          </Link>

          {/* {
            role === 'unPublished' ?
            <button className="btn-sm btn btn-error uppercase">unPublished</button>

            :
            <button className="btn-sm btn btn-info uppercase">Pending</button>
          } */}
        </div>
      </div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      {/* <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
           
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Admin : {adminName}</h3>
          <p className="py-4">Feedback : {adminMessage}</p>
        </div>
      </dialog> */}
    </div>
  );
};

export default MySurveyItems;
