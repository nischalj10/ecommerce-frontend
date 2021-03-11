import React, {useState, useEffect} from "react"
import {useSelector, useDispatch} from "react-redux";
import {toast} from "react-toastify";
import DatePicker from 'react-datepicker'
import {getCoupons, createCoupon, removeCoupon} from "../../../functions/coupon";
import "react-datepicker/dist/react-datepicker.css"
import {DeleteOutlined} from '@ant-design/icons'
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {

    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [discount, setDiscount] = useState('')
    const [loading, setLoading] = useState(false)
    const [coupons, setCoupons] = useState([])

    //redux
    const {user} = useSelector((state) => ({...state}))

    useEffect(() => {
        loadAllCoupons()
    }, [])

    const loadAllCoupons = () => getCoupons().then(res => setCoupons(res.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        //console.log(name, expiry, discount);
        createCoupon({name, expiry, discount}, user.token)
            .then((res) => {
                setLoading(false)
                loadAllCoupons();
                setName('')
                setDiscount('')
                setExpiry('')
                toast.success(`"${res.data.name}" coupon is created`)
            })
            .catch((err) => console.log("Create Coupon failed"))

    }

    const handleRemove = (_id) => {
        if(window.confirm('Delete Coupon?')) {
            setLoading(true)
            removeCoupon(_id, user.token)
                .then(res => {
                    loadAllCoupons();
                    setLoading(false);
                    toast.error(`${res.data.name} coupon deleted`)
                })
        }
    }


    return(
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col-md-2"}>
                    <AdminNav/>
                </div>

                <div className={"col-md-10"}>
                    {loading ? <h2 className={"text-danger text-center mt-3 mb-2 bg-info p-2"}>Loading...</h2> :
                        <h2 className={"text-center mt-3 mb-2 bg-info p-2"}>Coupons</h2>}
                        <hr/>

                    <form onSubmit={handleSubmit}>
                        <div className={"form-group"}>
                            <label className={"text-muted"}> Name </label>
                            <input className={"form-control"} type={"text"}
                            onChange={(e) => setName(e.target.value)}
                            value={name} autoFocus required/>
                        </div>

                        <div className={"form-group"}>
                            <label className={"text-muted"}> Discount % </label>
                            <input className={"form-control"} type={"text"}
                                   onChange={(e) => setDiscount(e.target.value)}
                                   value={discount} required/>
                        </div>

                        <div className={"form-group"}>
                            <label className={"text-muted"}> Expiry Date </label> <br/>
                            <DatePicker className={"form-control"} selected={new Date()} value={expiry}
                            required onChange={(date) => setExpiry(date)}/>
                        </div> <br/>

                    <button className={"btn btn-outline-primary"}>Create Coupon</button>

                    </form> <br/>

                    <h4>{coupons.length} Coupons</h4> <hr/>

                    <table className={"table table-bordered"}>
                        <thead className={"thead-light"}>
                            <tr>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Discount</th>
                                <th scope={"col"}>Expiry</th>
                                <th scope={"col"}>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                        {coupons.map((c) => <tr key={c._id}>
                            <th>{c.name}</th>
                            <th>{c.discount}%</th>
                            <th>{new Date(c.expiry).toLocaleDateString()}</th>
                            <th><DeleteOutlined className={"text-danger pointer "}
                            onClick={() => handleRemove(c._id)}/></th>
                        </tr>)}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>
    )
}

export default CreateCouponPage



