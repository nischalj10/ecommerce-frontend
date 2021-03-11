import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import UserNav from "../../components/nav/UserNav";
import {getWishlist, removeWishlist} from "../../functions/user";
import {Link} from 'react-router-dom'
import {toast} from "react-toastify";
import {DeleteOutlined} from '@ant-design/icons'

const Wishlist = () => {

    const {user} = useSelector((state) => ({...state}))
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        loadWishlist();
    }, [])

    const loadWishlist = () => {
        getWishlist(user.token)
            .then((res) => {
                //console.log("WISHLIST", res.data)
                setWishlist(res.data.wishlist)
            })
    }

    const handleRemove = (productId) =>
        removeWishlist(productId, user.token)
            .then((res) => {
                loadWishlist();
                toast.success("Removed from Wishlist!")
            })

    return (
    <div className="container-fluid">
        <div className="row">
            <div className={"col-md-2"}>
                <UserNav/>
            </div>
            <div className="col">
                <h2 className={"text-center mt-3 mb-2 bg-info p-2"}>Wishlist</h2> <hr/>

                {wishlist.map((p) => (
                    <div key={p._id} className={"alert alert-secondary"}>
                        <Link to={`/product/${p.slug}`}>
                            {p.title}
                        </Link>
                        <span onClick={() => handleRemove(p._id)} className={"btn btn-sm float-right"}>
                            <DeleteOutlined className={"text-danger"}/>
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default Wishlist;
