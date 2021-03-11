import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import AdminNav from "../../../components/nav/AdminNav";
import {getProductsByCount} from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import {removeProduct} from "../../../functions/product";
import {toast} from "react-toastify";


const AllProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    //redux
    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        loadAllProducts();
    }, [])

    const loadAllProducts = () => {
        setLoading(true)
        getProductsByCount(100)
            .then((res) => {
                //console.log(res.data)
                setProducts(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log("GET PRODUCTS BY COUNT ERROR", err)
                setLoading(false);
            })
    }

    const handleRemove = (slug) => {
        let answer = window.confirm("Delete product?")
        if(answer){
            //console.log('send delete request', slug)
            removeProduct(slug, user.token)
                .then((res) => {
                    loadAllProducts();
                    toast.error(`${res.data.title} is deleted!`)
                })
                .catch((err) => {
                    if(err.response.status === 400) toast.error(err.response.data)
                    console.log(err)
                })
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className={"col-md-2"}>
                    <AdminNav/>
                </div>
                <div className={"col"}>
                    {loading ?
                        <h2 className={"text-danger text-center mt-3 mb-2 bg-info p-2"}>Loading...</h2> :
                        <h2 className={"text-center mt-3 mb-2 bg-info p-2"}>All Products</h2>}
                        <hr/>

                    <div className="row">
                        {products.map((product) => (
                            <div className={"col-md-4 pb-3"}  key={product._id}>
                                <AdminProductCard product={product}
                                handleRemove={handleRemove}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllProducts