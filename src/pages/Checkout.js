import React, {useEffect, useState} from 'react'
import {getUserCart, emptyUserCart, saveUserAddress, createCashOrderForUser} from "../functions/user";
import {applyCoupon} from "../functions/user";
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"

const Checkout = ({history}) => {
    let dispatch = useDispatch()
    const {user,COD} = useSelector((state) => ({...state}))
    const couponTrueOrFalse = useSelector((state) => state.coupon)

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    const [addressSaved, setAddressSaved] = useState(false)
    const [coupon, setCoupon] = useState('')
    //coupon
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
    const[discountError, setDiscountError] = useState('')

    useEffect(() => {
        getUserCart(user.token)
            .then((res) => {
                //console.log("USER CART FETCHED FROM DB--->", JSON.stringify(res.data, null, 4))
                setProducts(res.data.products)
                setTotal(res.data.cartTotal)
            })
    }, [])



    const emptyCart = () => {
        //remove from local storage
        if(typeof window !== 'undefined') {
            localStorage.removeItem("cart")
        }
        //remove from redux
        dispatch({
            type: "ADD_TO_CART",
            payload: [],
        })
        //remove from backend
        emptyUserCart(user.token)
            .then((res) => {
                setProducts([])
                setTotal(0)
                setTotalAfterDiscount(0)
                setDiscountError('')
                setCoupon('')
                toast.error("Cart is empty! Continue shopping")
            })
    }

    const saveAddressToDb = () => {
        //console.log(address)
        saveUserAddress(user.token, address)
            .then((res) => {
                if(res.data.ok) setAddressSaved(true)
                toast.success("Address Saved")
            })
    }

    const showAddress = () => {
        return (
            <>
                <ReactQuill theme={"snow"} value={address}
                onChange={setAddress} className={"pl-2"} autoFocus/> <br/>

                <button className={"btn btn-primary btn-raised ml-2"}
                onClick={saveAddressToDb}>
                    Save
                </button>
            </>
        )
    }

    const showProductSummary = () => products.map((p,i) => (
            <div key={i}>
                <p>{p.product.title} ({p.color}) x {p.count} = {" "}
                    Rs. {p.product.price* p.count}</p>
            </div>
        ))


    const applyDiscountCoupon = () => {
        //console.log("coupon to backend", coupon)
        //apply coupon
        applyCoupon(user.token, coupon)
            .then((res) => {
                console.log("RESPONSE ON APPLYING COUPON", res.data)
                if(res.data){
                    setTotalAfterDiscount(res.data)
                    //push to redux as well
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload : true,
                    })
                }
                if(res.data.err) {
                    setDiscountError(res.data.err);
                    //update redux coupon applied
                    dispatch({
                        type: "COUPON_APPLIED",
                        payload : false,
                    })
                }
            })
    }

    const showApplyCoupon = () => (
        <>
            <input type={"text"} className={"form-control pl-2"}
            value={coupon} onChange={(e) => {
                setCoupon(e.target.value)
                setDiscountError('');
                setTotalAfterDiscount(0);
            }}/> <br/>

            <button onClick={applyDiscountCoupon} className={"btn btn-primary btn-raised ml-2"}>Apply Coupon</button>
        </>
    )

    const createCashOrder = () => {
        createCashOrderForUser(user.token, COD, couponTrueOrFalse)
            .then((res) => {
                console.log('USER CASH ORDER CREATION RES', res)
                //empty cart form redux, local storage,reset coupon and Cod
                if(res.data.ok) {
                    if(typeof window !== 'undefined') localStorage.removeItem('cart')
                    dispatch({
                        type : "COD",
                        payload : false,
                    })
                    dispatch({
                        type : "COUPON_APPLIED",
                        payload : false,
                    })
                    dispatch({
                        type : "ADD_TO_CART",
                        payload : [],
                    })
                    //empty from backend
                    emptyUserCart(user.token)
                    //redirect
                    setTimeout(() => {
                        history.push('/user/history')
                    }, 1000)
                }

            })
    }

    return(
        <div className={"row"}>

            <div className={"col-md-6"}>
                <h4 className={"pl-2 pt-2"}>Delivery Address</h4>  <br/>
                {showAddress()}
                <hr/>
                <h4 className={"pl-2 pt-2"}>Got Coupon?</h4> <br/>
                {showApplyCoupon()} <br/> <br/>
                {discountError && <p className={"bg-danger p-2"}>{discountError}</p>}
            </div>

            <div className={"col-md-6"}>
                <h4 className={"pt-2"}>Order summary</h4>
                <hr/>
                <p>Products - {products.length}</p>
                <hr/>
                {showProductSummary()}
                <hr/>
                <b>Cart Total : Rs.{total} </b> <br/> <br/>
                {totalAfterDiscount > 0 && <>
                    <div className={"bg-success font-weight-bold"}> Coupon Applied! <br/> Total After Discount : Rs.{totalAfterDiscount} </div>
                    <br/> <br/> </> }

                <div className={"row"}>

                    <div className={"col-md-6 "}>
                        <button className={"btn btn-danger btn-raised container"}
                        onClick={emptyCart} disabled={!products.length}>
                            Empty Cart
                        </button>
                    </div>

                    {COD ?  <div className={"col-md-6"}>
                        <button className={"btn btn-primary btn-raised container"}
                                disabled={!addressSaved || !products.length} onClick={createCashOrder}>
                            Place order
                        </button> </div> :
                            <div className={"col-md-6"}>
                        <button className={"btn btn-primary btn-raised container"}
                                disabled={!addressSaved || !products.length} onClick={() => history.push('/payment')}>
                            Place order
                        </button> </div>}
                </div>

            </div>

        </div>
    )

}

export default Checkout