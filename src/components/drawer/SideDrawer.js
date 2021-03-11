import React from "react";
import {Drawer, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom'
import Laptop from '../../images/laptop.png'

const SideDrawer = () => {
    const dispatch = useDispatch()
    const {drawer, cart} = useSelector((state) => ({...state}))
    const imageStyle =  {
        width : '100%',
        height : '100px',
        objectFit: 'cover',
    }

    return (
        <Drawer visible={drawer} placement={"right"} closable={true}
        className={"text-center"}
        onClose={() => {
            dispatch({
                type : "SET_VISIBLE",
                payload : false, }) }}
        title={`Cart - ${cart.length} Products`}>

            {cart.map((p) => (
                <div key={p._id} className={"row"}>
                    <div className={"col"}>
                        {p.images[0] ? (
                            <>
                            <img src={p.images[0].url} style={imageStyle} className={"p-1"}/>
                            <p className={"text-center bg-primary text-light"}>
                                {p.title} - Rs{p.price}
                            </p> <hr/>
                            </>
                            ) : (
                            <>
                                <img src={Laptop} style={imageStyle} className={"p-1"}/>
                                <p className={"text-center bg-primary text-light"}>
                                    {p.title} - Rs{p.price}
                                </p> <hr/>
                            </>
                            )}
                    </div>
                </div>
            ))}
            <br/>

            <Link to={"/cart"}>
                <button className={"text-center btn btn-success btn-raised btn-block"}
                onClick={() => dispatch({
                    type: 'SET_VISIBLE',
                    payload: false,
                })}>
                    Go to cart
                </button>
            </Link>

        </Drawer>
    )
}

export default SideDrawer