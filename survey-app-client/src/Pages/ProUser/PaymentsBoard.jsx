import { Link, useLoaderData } from "react-router-dom";
import Payment from "./Payment";

const PaymentsBoard = () => {
  const loaderData = useLoaderData();
  console.log(loaderData);

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="max-w-xl p-10 rounded-md mx-auto border">
        <h2 className="text-4xl font-semibold text-center">Payment</h2>

        {loaderData?.map((data) => (
          <div
            key={data._id}
            className="card w-full"
          >
            <div className="card-body text-left">
              <h2 className="text-xl font-bold">
                Plan : {data.pro_user_plan}
              </h2>
              <p className=" text-xl font-semibold">
                Price : {data.price_per_month}
                <Payment data={data}></Payment>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsBoard;
