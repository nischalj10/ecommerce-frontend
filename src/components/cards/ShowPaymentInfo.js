import React from "react";


const ShowPaymentInfo = ({order, showStatus = true}) => (
    <div>
        <p>
            {/*<span>OrderId : {order.paymentIntent.id}</span> {"   "}*/}

            <span className={"badge"}>Amount : {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            })} </span> {"   "}

            {/*<span>Currency : {order.paymentIntent.currency.toUpperCase()}</span> {"   "}*/}
            {/*<span>Method : {order.paymentIntent.payment_method_types[0]} </span> {"   "}*/}
            <span className={"badge"}>Payment : {order.paymentIntent.status.toUpperCase()}</span> {"   "}

            <span className={"badge"}>OrderedOn : {new Date(order.paymentIntent.created * 1000).toLocaleDateString()}
            </span> {"   "} <br/>

            {showStatus && <span className={"badge bg-primary text-white"}>STATUS : {order.orderStatus}
            </span>} {"   "}
        </p>
    </div>
)

export default ShowPaymentInfo