import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../../Components/Hooks/useAxiosSecure";
import useAxiosPublic from "../../../../Components/Hooks/useAxiosPublic";
import useAuth from "../../../../Components/Hooks/useAuth";

const SurveysItem = ({ item }) => {
  const { title, description, category, like, dislike, timeFormate, _id } =
  item;
  const axiosPublic = useAxiosPublic()
  const {loading} = useAuth()

  const { data: countVote = []} = useQuery({
    queryKey: ["countVote"],
    enabled:!loading,
    queryFn: async () => {
      const res = await axiosPublic.get("/votes");
      return res.data;
    },
  });

  const countFilter = countVote.filter(count => count.surveyId === _id)
  console.log(countFilter)
  return (
    <div className="card bg-neutral text-neutral-content">
      <div className="card-body text-center">
        <h2 className="capitalize text-center text-xl font-semibold">
          {title}
        </h2>
        <p className="text-slate-400 mb-2">{description}</p>

        <div className="card-actions">
          <h2 className="text-lg">
            Voted : <span className="font-bold">{countFilter.length}</span>
          </h2>
        </div>
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
          <Link to={`/surveys/${_id}`}>
            <button className="btn-sm btn btn-primary">View Survey</button>
          </Link>
         
        </div>
      </div>
    </div>
  );
};

export default SurveysItem;
