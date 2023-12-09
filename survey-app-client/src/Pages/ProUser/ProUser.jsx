import { useQuery } from "@tanstack/react-query";
import SectionHeader from "../../shared/Banner/SectionHeader";
import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAuth from "../../Components/Hooks/useAuth";
import { useEffect } from "react";

const ProUser = () => {
  useEffect(() => {
    document.title = "Fimro | Survey Pro User";
  }, []);

  const { loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: proUsers = [],  } = useQuery({
    queryKey: ["proUsers"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get("/proUser");
      return res.data;
    },
  });
  // console.log(proUsers);
  // if(proUserLoading) {
  //   return <span>loading...</span>
  // }
  return (
    <div>
      <SectionHeader
        img="https://i.ibb.co/9ybkSMV/clipboard-6225718-1280.jpg"
        title="Become a Pro User"
      ></SectionHeader>

      <div className="max-w-6xl mx-auto my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-3 xl:px-0">
        {proUsers.map((item) => (
          <div key={item._id} className="card bg-primary text-primary-content">
            <div className="card-body">
              <h2 className="text-xl font-bold text-center">
                {item.pro_user_plan}
              </h2>
              <p className="text-center text-4xl font-semibold">
                {item.price_per_month}
              </p>
              <div className="my-6">
                <ul className="list-decimal font-semibold text-[#ccc] px-5">
                  <li>Can participate in a survey </li>
                  <li>Like or dislike a survey</li>
                  <li>Can report a survey</li>
                  <li>Can comment on a survey</li>
                </ul>
              </div>
              <div className="card-actions justify-center">
                <Link to={`/payment/${item._id}`}>
                  <button className="btn">Payment Now Now</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProUser;
