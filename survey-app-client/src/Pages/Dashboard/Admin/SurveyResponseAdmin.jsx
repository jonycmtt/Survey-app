import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Components/Hooks/useAxiosSecure";
import { Cell, Pie, PieChart } from "recharts";
import { useEffect } from "react";
const SurveyResponseAdmin = () => {
  useEffect(() => {
    document.title = "Fimro | Response Survey";
  }, []);
  const axiosSecure = useAxiosSecure();
  const { data: surveyResponseAll = [] } = useQuery({
    queryKey: ["survey_response"],
    queryFn: async () => {
      const rest = await axiosSecure.get("/votes");
      return rest.data;
    },
  });
  console.log(surveyResponseAll);
  const ResponseChartYes = surveyResponseAll.map(data => {
    return data.yesVote
  })
  const ResponseChartNo = surveyResponseAll.map(data => {
    return data.noVote
  })
  const yesVoteLength = ResponseChartYes.length;
  const NoVoteLength = ResponseChartNo.length;

  const data = [
    { name: 'Yes Vote', value: yesVoteLength },
    { name: 'No Vote', value: NoVoteLength },
  ];
  const COLORS = ['#FFBB28', '#FF8042'];

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
      <h2 className="text-2xl font-semibold">Survey All Response</h2>
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
                surveyResponseAll?.map((item,idx) => <tr key={item._id}>
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
    </div>
  );
};

export default SurveyResponseAdmin;
