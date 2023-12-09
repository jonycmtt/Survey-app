import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import useAuth from "../../../Components/Hooks/useAuth";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { useEffect } from "react";

const SurveyResponse = () => {

  useEffect(() => {
    document.title = "Fimro | Survey Response";
  }, []);
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth()
  const { data: surveyResponseAll = [] } = useQuery({
    queryKey: ["survey_response"],
    queryFn: async () => {
      const rest = await axiosSecure.get("/votes");
      return rest.data;
    },
  });

  const findSurveyResponse = surveyResponseAll.filter(response => response?.surveyEmail === user?.email)
  console.log(findSurveyResponse);

  // const surveyYes = findSurveyResponse.filter(yes => yes.)

  const ResponseChartYes = findSurveyResponse.map(data => {
    return data.yesVote
  })
  const ResponseChartNo = findSurveyResponse.map(data => {
    return data.noVote
  })
  // console.log(ResponseChart.length)
  const yesVoteLength = ResponseChartYes.length;
  const NoVoteLength = ResponseChartNo.length;



  const data = [
    { name: 'Yes Vote', value: yesVoteLength },
    { name: 'No Vote', value: NoVoteLength },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent,  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
        <h1 className="text-2xl font-semibold">Survey Response</h1>
        <div className="my-10">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Time</th>
                <th>Voted</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {
                findSurveyResponse?.map((item,idx) => <tr key={item._id}>
                  <th>{idx+1}</th>
                  <td>{item.title}</td>
                  <td>{item.voteEmail}</td>
                  <td>{item.voteDate}</td>
                  <td>
                    {item?.yesVote ? item?.yesVote : item?.noVote }
                    </td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
      <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <legend></legend>
        </PieChart>
    </div>
  )
}

export default SurveyResponse
