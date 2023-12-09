import { useEffect, useState } from "react";


const useCount = () => {
    const axiosSecure = axiosSecure();
    const [count,setCount] = useState([])
    useEffect(()=> {
        axiosSecure.get('/votes')
        .then(res => {
            setCount(res.data)
        })
    }, [axiosSecure])

    return [count]
    
}

export default useCount
