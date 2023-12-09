import moment from "moment";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";

const UpdatedSurvey = () => {
  useEffect(() => {
    document.title = "Fimro | Survey Update";
  }, []);

  const loaderData = useLoaderData();
  console.log(loaderData);
  const timeFormate = moment().format("ll");
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const {
    title,
    description,
    category,
    like,
    dislike,
    _id,
    adminName,
    adminMessage,
    role,
    option1,
    option2,
  } = loaderData;
  const handleUpdateSurvey = event => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    // const Timestamp = form.date.value;

    const option1 = form.option1.value;
    const option2 = form.option2.value;

    const updateSurveyInfo = {
        title,
        description,
        category,
        timeFormate,
        option1,option2,
  
      };
      axiosSecure.patch(`/survey/updated/${_id}`, updateSurveyInfo).then((res) => {
        if (res.data.modifiedCount > 0) {
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
    <div>
      <h2 className="text-2xl font-semibold text-center">Update Survey</h2>
      <div>
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          <form onSubmit={handleUpdateSurvey} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Survey Title :</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Survey Title"
                defaultValue={title}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Survey Description :</span>
              </label>
              <textarea
                required
                placeholder="Description"
                defaultValue={description}
                className="input input-bordered resize-none h-52"
                name="description"
                id=""
              ></textarea>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Survey Category :</span>
                </label>
                <select
                  required
                  defaultValue={category}
                  name="category"
                  className="select input-bordered w-full"
                >
                  <option disabled selected>
                    Selected Category
                  </option>
                  <option value="all">All Categories</option>
                  <option value="technology">Technology</option>
                  <option value="science">Science</option>
                  <option value="business">Business</option>
                  <option value="health">Health</option>
                  <option value="health">Playing</option>
                </select>
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Timestamp :</span>
                </label>
                <input
                  readOnly
                  name="date"
                  //   value={}
                  defaultValue={timeFormate}
                  className="input input-bordered"
                  type="text"
                  placeholder="Timestamp"
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Options 1:</span>
                </label>
                <input
                  name="option1"
                  type="text"
                  defaultValue={option1}
                  placeholder="Type Yes Or No"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Options 2:</span>
                </label>
                <input
                  name="option2"
                  type="text"
                  defaultValue={option2}
                  placeholder="Type Yes Or No"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatedSurvey;
