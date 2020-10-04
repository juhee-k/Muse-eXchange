import React from "react";
import { useHistory } from "react-router-dom";

function PurchaseBtn(props) {
  const history = useHistory();

console.log(props.currentuser)


  return (
    <div className="Paypal">
      <button
        onClick={() =>
          history.push(`/pages/Payment/${props.title}/${props.price}/${props.id}/${props.currentuser}`)
        }
      >
        {" "}
        Make Purchase{" "}
      </button>
    </div>
  );
}


export default PurchaseBtn;
