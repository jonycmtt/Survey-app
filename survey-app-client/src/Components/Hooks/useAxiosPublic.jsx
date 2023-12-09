import axios from "axios"

const axiosPublic = axios.create({
    baseURL: 'https://survey-app-server-six.vercel.app'
})

const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic
