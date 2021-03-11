import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import {Button} from "antd";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import {userCart} from "../functions/user";

const Cart = ({history}) => {

    const {user, cart} = useSelector((state) => ({...state}))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type : "COD",
            payload : false,
        })
    }, [])

    const getTotal = () => {
        return cart.reduce((currentValue, nextValue) => {
            return currentValue+ nextValue.count * nextValue.price
        }, 0)
    }

    const saveOrderToDb = () => {
        //console.log('Cart', JSON.stringify(cart, null, 4))
        userCart(cart, user.token)
            .then((res) => {
            console.log("Cart POST res", res)
            if(res.data.ok) {
                dispatch ({
                    type : "COD",
                    payload : false,
                })
                history.push("/checkout")
            }
        })
            .catch((err) => console.log("cart save error", err))
    }

    const saveCashOrderToDb = () => {
        //console.log('Cart', JSON.stringify(cart, null, 4))
        userCart(cart, user.token)
            .then((res) => {
                console.log("Cart POST res", res)
                if(res.data.ok) {
                    dispatch ({
                        type : "COD",
                        payload : true,
                    })
                    history.push("/checkout")
                }
            })
            .catch((err) => console.log("cart save error", err))
    }

    const showCartItems = () => (
        <table className={"table table-bordered"}>
            <thead className={"thead-light"}>
                <tr>
                    <th scope={"col"}>Image</th>
                    <th scope={"col"}>Title</th>
                    <th scope={"col"}>Price</th>
                    <th scope={"col"}>Brand</th>
                    <th scope={"col"}>Color</th>
                    <th scope={"col"}>Qty</th>
                    <th scope={"col"}>Shipping</th>
                    <th scope={"col"}>Remove</th>
                </tr>
            </thead>

            {cart.map((p) => (
                <ProductCardInCheckout key={p._id} p={p}/>
            ))}
        </table>
    )

    return (
        <div className={"container-fluid pt-2"}>
            <div className={"row"}>

            </div>

            <div className={"row"}>
                <div className={"col-md-9"}>
                    <h4 className={"pt-2 pb-2"}>Cart - {cart.length} Products</h4>
                    {!cart.length ? <p> No products in cart! <br/> Why don't you go to <Link to={"/shop"}> Shop </Link> and add some?
                    </p> : (showCartItems())
                    }
                </div>

                <div className={"col-md-3"}>
                    <h4 className={"pt-2 pb-2"}>Cart Summary</h4>
                    <hr/>
                    <p>Products</p>
                    {cart.map((c,i) => (
                        <div key={i}>
                            <p> {c.title} x {c.count} = Rs. {c.price * c.count}</p>
                        </div>
                    ))}

                    <hr/>
                    Total: <b>Rs. {getTotal()}</b>
                    <hr/>

                    {user ? (<>
                        <Button onClick={saveOrderToDb} disabled={!cart.length}
                                className={"btn btn-sm btn-primary mt-2 btn-raised"}>
                            Pay Online
                        </Button>
                        <br/>

                        <Button onClick={saveCashOrderToDb} disabled={!cart.length}
                                className={"btn btn-sm btn-warning mt-2 btn-raised"}>
                            Pay Cash On Delivery
                        </Button>

                    </> ) : (
                        <Button className={"btn btn-sm btn-primary mt-2 btn-raised"}>
                        <Link to={{
                            pathname : "/login",
                            state : {from : "cart"},
                        }}> Login to Checkout</Link>
                    </Button>)}
                </div>
            </div>
        </div>
    )
}

export default Cart