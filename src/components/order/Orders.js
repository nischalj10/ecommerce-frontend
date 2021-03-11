import React from "react";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({orders, handleStatusChange}) => {

    const showOrderInTable = (order) => (
        <table className={"table table-bordered"}>
            <thead className={"thead-light"}>
            <tr>
                <th scope={"col"}>Title</th>
                <th scope={"col"}>Price</th>
                <th scope={"col"}>Brand</th>
                <th scope={"col"}>Color</th>
                <th scope={"col"}>Qty.</th>
                <th scope={"col"}>Shipping</th>
            </tr>
            </thead>

            <tbody>
            {order.products.map((p,i) => (
                <tr key={i}>
                    <td><b>{p.product.title}</b></td>
                    <td>{p.product.price}</td>
                    <td>{p.product.brand}</td>
                    <td>{p.color}</td>
                    <td>{p.count}</td>
                    <td>{p.product.shipping === "Yes" ?
                        <CheckCircleOutlined style={{color : "green"}}/> :
                        <CloseCircleOutlined style={{color : "red"}}/>} </td>
                </tr>
            ))}
            </tbody>
        </table>
    )


    return (<>
        {orders.map((order) => (
            <div key={order._id} className={"row pb-5"}>
                <div
                    className={order.orderStatus === "Delivered" ? "btn btn-block btn-outline-success" : "btn btn-block btn-outline-info" &&
                    order.orderStatus === "Cancelled" ? "btn btn-block btn-outline-danger" : "btn btn-block btn-outline-info" &&
                    order.orderStatus === "Not processed yet" ? "btn btn-block btn-outline-dark" : "btn btn-block btn-outline-info"}>
                    <ShowPaymentInfo order={order} showStatus={true}/>
                    {/*set show status to false if you don't want to show it for admin twice*/}
                    <div className={"row"}>
                        <div className={"col-md-4 "}>
                            Delivery Status
                        </div>

                        <div className={"col-md-8"}>
                            <select onChange={e => handleStatusChange(order._id, e.target.value)}
                                    className={"form-control"} defaultValue={order.orderStatus}>
                                <option value={"Not processed yet"}>Not processed yet</option>
                                <option value={"Cash On Delivery"}>Cash On Delivery</option>
                                <option value={"Processing"}>Processing</option>
                                <option value={"Dispatched"}>Dispatched</option>
                                <option value={"Cancelled"}>Cancelled</option>
                                <option value={"Delivered"}>Delivered</option>
                            </select>
                        </div>
                    </div>
                </div>

                {showOrderInTable(order)}
            </div>
        ))}
    </>)
}

export default Orders