import React, {useEffect, useState} from 'react'
import {getProducts} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";

const  Home = () => {

    return(
        <>
            <div className={"jumbotron text-danger h1 font-weight-bold text-center"}>
                <Jumbotron text={['Latest Products','New Arrivals', 'Best Sellers']}/>
            </div>

            <h4 className={"text-center p-3 mt-5 mb-5 display-4 jumbotron"}>
            New Arrivals</h4>
            <NewArrivals/>

            <h4 className={"text-center p-3 mt-5 mb-5 display-4 jumbotron"}>
                Best Sellers</h4>
            <BestSellers/>

            <h4 className={"text-center p-3 mt-5 mb-5 display-4 jumbotron"}>
               Categories </h4>
            <CategoryList/>

            <h4 className={"text-center p-3 mt-5 mb-5 display-4 jumbotron"}>
                Sub-Categories </h4>
            <SubList/>

        </>
    );
};

export default Home;