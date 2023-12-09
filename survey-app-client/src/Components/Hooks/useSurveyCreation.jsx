import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure";

const useSurveyCreation = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data : ownSurvey = [],refetch} = useQuery({
        queryKey: ['surveys', user?.email],
        queryFn : async() => {
            const res = await axiosSecure.get(`/survey`)
            return res.data;
        }
    }) 
  return [ownSurvey,refetch]
}

export default useSurveyCreation
