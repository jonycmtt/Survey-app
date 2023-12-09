import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic"

const useSurvey = () => {
    const axiosPublic = useAxiosPublic();
    const {data : survey = [],refetch} = useQuery({
        queryKey: ['survey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/survey')
            return res.data
        },
    })

  return [survey,refetch];
}

export default useSurvey
