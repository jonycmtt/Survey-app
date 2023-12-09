import moment from "moment/moment";
import SectionTitle from "../../../shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Components/Hooks/useAuth";
import { useEffect } from "react";


const SurveyCreation = () => {
  useEffect(() => {
    document.title = "Fimro | Survey Creation";
  }, []);
  // const currentUTCISO = new Date().toISOString();

  // const moment = require('moment');
  // const timeFormate = moment().startOf('min').fromNow();
  const {user} = useAuth()
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const timeFormate = moment().format("ll");

  const handleAddSurvey = (event) => {
    
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = form.category.value;
    // const Timestamp = form.date.value;
  
    const option1 = form.option1.value;
    const option2 = form.option2.value;
    const like = form.like.value;
    const dislike = form.dislike.value;
    
    console.log(title, description, category, timeFormate,option1,option2,like,dislike);

    const addSurveyInfo = {
      title,
      description,
      category,
      timeFormate,
      option1,option2,like,dislike,
      email : user?.email,
      name : user?.displayName,
      photoURL: user?.photoURL,

    };

    axiosSecure.post("/survey", addSurveyInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/mySurvey');
      }
    });
  };
  return (
    <div>
      <SectionTitle title="Survey Creation"></SectionTitle>

      <div>
        <div className="card shrink-0 w-full shadow-2xl bg-base-100">
          <form onSubmit={handleAddSurvey} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Survey Title :</span>
              </label>
              <input
                name="title"
                type="text"
                placeholder="Survey Title"
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
                  value={timeFormate}
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
                  placeholder="Type Yes Or No"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Like:</span>
                </label>
                <input
                  name="like"
                  type="text"
                  defaultValue={'0'}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Dislike:</span>
                </label>
                <input
                  name="dislike"
                  type="text"
                  defaultValue={'0'}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            <div className="form-control mt-6">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyCreation;
