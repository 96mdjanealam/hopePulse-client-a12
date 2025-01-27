import { useState } from "react";
import PaymentForm from "./PaymentForm";
import AllFunding from "./AllFunding";

export default function Payment() {
  const [formOpen, setFromOpen] = useState(false);

  const handleMakePayment = () => {
    setFromOpen(true);
  };
  const handleAllFunding = () => {
    setFromOpen(false);
  };

  return (
    <div>
      <div className="flex gap-4  justify-center my-7">
        <button
          onClick={handleMakePayment}
          className={`btn ${formOpen && "btn-neutral"} btn-sm`}
        >
          Make Payment
        </button>
        <button
          onClick={handleAllFunding}
          className={`btn ${!formOpen && "btn-neutral"} btn-sm`}
        >
          All Funding
        </button>
      </div>


{formOpen?<PaymentForm></PaymentForm>:<AllFunding></AllFunding>}
      


    </div>
  );
}
