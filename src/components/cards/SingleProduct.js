import React, {useState} from "react";
import {Card, Tabs, Tooltip} from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import {showAverage} from "../../functions/rating";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {addToWishlist} from "../../functions/user";
import {toast} from "react-toastify";

const { TabPane } = Tabs;

// this is children component of Product page
const SingleProduct = ({ product, onStarClick, star }) => {
    const { title, images, description, _id } = product;

    const [tooltip, setTooltip] = useState('Click to Add')
    //redux
    const dispatch = useDispatch();
    const {user, cart} = useSelector((state) => ({...state}))

    const handleAddToCart = () => {
        //create cart array
        let cart = [];
        if(typeof window !== 'undefined') {

            //if cart if in local storage, get it
            if(localStorage.getItem('cart')) {
                cart = JSON.parse(localStorage.getItem('cart'))
            }
            //push new product if the cart is made 1st time
            cart.push({
                ...product, // spreading helps us add the next property i.e count to the product
                count : 1, })
            //remove duplicates if added to cart more than once
            let unique = _.uniqWith(cart, _.isEqual)
            //save to local storage
            //console.log(unique)
            localStorage.setItem('cart', JSON.stringify(unique));
            //show tooltip
            setTooltip("Added to Cart")

            //add to redux state
            dispatch({
                type : "ADD_TO_CART",
                payload : unique,
            })
            //show cart items in side drawer
            dispatch({
                type : "SET_VISIBLE",
                payload : true,
            })
        }
    }

    const handleAddToWishlist = (e) => {
        e.preventDefault();
        addToWishlist(product._id, user.token)
            .then((res) => {
                // console.log("ADDED TO WISHLIST", res.data);
                if(res.data.ok) toast.success("Added to your Wishlist!")
            })
    }

    return (
        <>
            <div className="col-md-7">
                {images && images.length ? (
                    <Carousel showArrows={true} autoPlay infiniteLoop>
                        {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                    </Carousel>
                ) : (
                    <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
                )}

                <Tabs type="card">
                    <TabPane tab="Description" key="1">
                        {description && description}
                    </TabPane>
                    <TabPane tab="More" key="2">
                        Call use on xxxx xxx xxx to learn more about this product.
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>

                {product && product.ratings && product.ratings.length > 0
                ? showAverage(product) :
                <div className={"text-center pt-1 pb-3"}>No rating yet</div>}

                <Card
                    actions={[
                        <Tooltip title={tooltip}>
                            <a onClick={handleAddToCart}> <ShoppingCartOutlined className={"text-danger"}/>
                                <br/> Add to Cart </a>
                        </Tooltip>,

                        <a onClick={handleAddToWishlist}>
                            <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                        </a>,

                        <RatingModal>
                            <StarRating
                                name={_id}
                                numberOfStars={5}
                                rating={star}
                                changeRating={onStarClick}
                                isSelectable={true}
                                starRatedColor="red"
                            />
                        </RatingModal>,
                    ]}
                >
                    <ProductListItems product={product} />
                </Card>
            </div>
        </>
    );
};

export default SingleProduct;
