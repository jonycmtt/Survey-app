
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';

const useLikeCount = () => {
    const {loading} = useAuth()
    const axiosPublic = useAxiosPublic()
   const { data: countThumbs = [],refetch} = useQuery({
    queryKey: ["countVote"],
    enabled:!loading,
    queryFn: async () => {
      const res = await axiosPublic.get("/thumbsCount");
      return res.data;
    },
  });
  return [countThumbs,refetch]
}

export default useLikeCount
