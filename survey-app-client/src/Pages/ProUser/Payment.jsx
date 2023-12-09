import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Checkout from "./Checkout"
import { useEffect } from "react"

const stripePromise = loadStripe(import.meta.env.VITE_payment_Gateway_PK)
const Payment = ({data}) => {
  useEffect(() => {
    document.title = "Fimro | Payment";
  }, []);
    // console.log(data.price_per_month)
  return (
    <div className="py-5 px-3 border my-5 rounded-lg">
        <Elements stripe={stripePromise}>
            <Checkout price={data.price_per_month}></Checkout>
        </Elements>
    </div>
  )
}

export default Payment
