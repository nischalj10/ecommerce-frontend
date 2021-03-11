import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import SingleProduct from "../components/cards/SingleProduct";
import {useSelector} from "react-redux";
import {getRelated} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";

const Product = ({ match }) => {
    const [product, setProduct] = useState({});
    const [related, setRelated] = useState([]);
    const [star, setStar] = useState(0);

    const {user} = useSelector((state) => ({...state}))

    const { slug } = match.params;

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        if(product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (ele) => ele.postedBy.toString() === user._id.toString()
            );

            existingRatingObject && setStar(existingRatingObject.star)
        }
    })

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        console.table(newRating, name);
        productStar(name, newRating, user.token).then((res) => {
            console.log("rating clicked", res.data)
            loadSingleProduct(); // if you want to show updated rating in real time
        }
        );
    };

    const loadSingleProduct = () => {
        getProduct(slug).then((res) => {
            setProduct(res.data)
            //load related
            getRelated(res.data._id).then(res =>
            setRelated(res.data))
        });

    }


    return (
        <div className={"container-fluid"}>
            <div className={"row pt-4"}>
                <SingleProduct product={product}
                onStarClick={onStarClick}
                star={star}/>
            </div>

            <div className={"row"}>
                <div className={"col text-center pt-5 pb-5"}>
                    <hr/>
                    <h3>Related Products</h3>
                    <hr/>
                    {/*{JSON.stringify(related)};*/}


                </div>
            </div>

            <div className={"row pb-5"}>
                {related.length ? related.map((p) => (
                    <div key={p._id} className={"col-md-4"}>
                        <ProductCard product={p}/>
                    </div>
                )) : <div className={"text-center col"}>
                    No Related Products found
                </div>}
            </div>

        </div>

    );
};

export default Product;
