import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import useAuth from "../../Components/Hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";

const Checkout = ({price}) => {
    const paymentDate = moment(new Date()).format('ll'); 
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId,setTransactionId] = useState("")
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const priceCart = price;
  console.log(priceCart)


  useEffect(() => {
    if (priceCart > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: priceCart })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure,priceCart]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

     //   confirm payment
     const { paymentIntent, error: confirmError } =
     await stripe.confirmCardPayment(clientSecret, {
       payment_method: {
         card: card,
         billing_details: {
           email: user?.email || "anonymous",
           name: user?.displayName || "anonymous",
         },
       },
     });
   if (confirmError) {
     console.log("confirmError", confirmError);
   } else {
     console.log("paymentIntent", paymentIntent);
     if (paymentIntent.status === "succeeded") {
       console.log("transaction Id", paymentIntent.id);
       setTransactionId(paymentIntent.id);

       const payment = {
         email: user.email,
         name: user.displayName,
         price: priceCart,
         transactionId: paymentIntent.id,
         date: paymentDate,
         status: "pending",
       };
      //  const post to users
      // const payToUsers = {
      //   email: user.email,
      //   name: user.displayName,
      //   status: "pending",
      // }
       const res = await axiosSecure.post("/payments", payment)
       .then((res)=>{
        if (res.data.insertedId) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
            // navigate('/dashboard/mySurvey');
          }
       })
       console.log(res.data);

      //  post user
      // axiosSecure.post("/users", payToUsers)
      // .then(res => {
      //   console.log(res.data)
      // })
     }
   }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-success mx-auto block mt-10 max-w-md"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Payment
        </button>
        <p className="text-red-500 my-6 text-center">{error}</p>

        {transactionId && (
          <p className="text-green-500">
            Your Transaction Id : {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default Checkout;
