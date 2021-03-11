import React, {useState, useEffect} from 'react';
import UserNav from "../../components/nav/UserNav";
import {getUserOrders} from "../../functions/user";
import {useSelector, useDispatch} from "react-redux";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {toast} from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import {PDFDownloadLink} from '@react-pdf/renderer';
import Invoice from "../../components/order/Invoice";

const History = () => {
    const {user} = useSelector((state) => ({...state}))
    const [orders, setOrders] = useState([])

    useEffect(() => {
        loadUserOrders();
    }, [])

    const loadUserOrders = () => {
        getUserOrders(user.token)
            .then((res) => {
                console.log(JSON.stringify(res.data, null, 4))
                setOrders(res.data)
            })
    }

    const showEachOrders = (orders) =>
        orders.reverse().map((order, i) => (
            <div key={i} className={"m-5 p-3 card"}>
                <p> <ShowPaymentInfo order={order}/> </p>
                {showOrderInTable(order)}
                <div className={"row"}>
                    <div className={"col"}>
                        {showDownloadLink(order)}
                    </div>
                </div>
            </div>
        ))

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

    const showDownloadLink = (order) => (
        <PDFDownloadLink fileName={"invoice.pdf"} document={
            <Invoice order={order}/>}
             className={"btn btn-sm btn-block btn-outline-primary"}>
             Download Invoice PDF
        </PDFDownloadLink>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className={"col-md-2"}>
                    <UserNav/>
                </div>
                <div className="col text-center">
                    {orders.length > 0 ? <h2 className={"text-center mt-3 mb-2 bg-info p-2"}>My Orders </h2> :
                        <h2 className={"p-2 text-center mt-3 mb-2 bg-info"}>No purchase Orders yet</h2>} <hr/>

                    {showEachOrders(orders)}


                </div>
            </div>
        </div>
    )
}

export default History;
