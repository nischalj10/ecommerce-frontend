import React, {useState} from 'react'
import {Card, Tooltip} from "antd";
import {EyeOutlined, ShoppingCartOutlined} from '@ant-design/icons'
import laptop from '../../images/laptop.png'
import {Link} from 'react-router-dom'
import {showAverage} from "../../functions/rating";
import _ from "lodash"
import {useDispatch, useSelector} from "react-redux";

const ProductCard = ({product}) => {

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

    //destructure
    const {images, title, description, slug, price} = product;

return (

    <>
        {product && product.ratings && product.ratings.length > 0
            ? showAverage(product) :
            <div className={"text-center pt-1 pb-3"}>No rating yet</div>}

    <Card cover={
        <img src={images && images.length ? images[0].url : laptop}
             style={{height: "15vw", width: "100%", objectFit: "cover"}}
             className={"p-1"} alt={"Product Image"}/>
    }
          actions={[
              <Link to={`/product/${slug}`}>
                  <EyeOutlined className={"text-warning"}/>
                  <br/> View Product
              </Link>,

              <Tooltip title={tooltip}>
                  <a disabled={product.quantity< 1} onClick={handleAddToCart}>
                  <ShoppingCartOutlined className={product.quantity<1 ? "" :"text-danger"}/>
                  <br/> {product.quantity<1 ? 'Out of Stock!!' : 'Add to Cart'} </a>
              </Tooltip>]}>

        <Card.Meta
            title={`${title} @ Rs.${price}`}
            description={`${description && description.substring(0, 40)}...`}/>

    </Card>

    </>


)
}

export default ProductCard