import React, {useState, useEffect} from 'react'
import {getProductsByCount} from "../functions/product";
import {useSelector, useDispatch} from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import {fetchProductsByFilter} from "../functions/product";
import {Menu, Slider, Checkbox, Radio} from "antd";
import {DollarOutlined, DownSquareOutlined, StarOutlined} from "@ant-design/icons";
import {getCategories} from "../functions/category";
import {getSubs} from "../functions/sub";
import Star from "../components/forms/Star";

const {SubMenu, ItemGroup} = Menu

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [price, setPrice] = useState([0,0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [categoryIds, setCategoryIds] = useState([])
    const [star, setStar] = useState("")
    const [subs, setSubs] = useState([]);
    const [sub, setSub] = useState("")
    const [brands, setBrands] = useState(["Apple","Asus","Samsung","Microsoft","Lenovo"])
    const [brand, setBrand] = useState("")
    const [colors, setColors] = useState(["Black","Brown","Silver","White","Blue"])
    const [color, setColor] = useState("")
    const [shipping, setShipping] = useState("");
    
    let dispatch = useDispatch();
    let {search} = useSelector((state) => ({...state}))
    const {text} = search;

    //important functions
    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
            setProducts(res.data)
        });
    }

    const loadAllProducts = () => {
        getProductsByCount(21).then((p) => {
            setProducts(p.data);
            setLoading(false);
        })
    }


    // 1. Load products by default on page load
    useEffect(() => {
        setLoading(true);
        loadAllProducts();
        //fetch categories
        getCategories().then((res) => setCategories(res.data))
        //fetch subcategories
        getSubs().then((res) => setSubs(res.data))
    }, [])

    // 2. Load products on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({query : text});
            if(!text) loadAllProducts();
        }, 300)
        return () => clearTimeout(delayed);
    }, [text])

    //3. load products based on price range
    useEffect(() => {
        console.log('ok to request');
        fetchProducts({price : price})
    }, [ok])

    //4 load products based on categories - show in a list of checkboxes
    const showCategories = () => categories.map((c) =>
    <div key={c._id}>
        <Checkbox className={"pb-2 pl-4 pr-4"}
        value={c._id} name={"category"} onChange={handleCheck}
        checked={categoryIds.includes(c._id)}>
            <span className={"pt-2 ml-2"}>{c.name}</span>
        </Checkbox>
    </div>)

    //5 show products by star ratings
    const showStars = () => (
        <div className={"pr-4 pl-4 pb-2"}>
            <Star starClick={handleStarClick} numberOfStars={5}/>
            <Star starClick={handleStarClick} numberOfStars={4}/>
            <Star starClick={handleStarClick} numberOfStars={3}/>
            <Star starClick={handleStarClick} numberOfStars={2}/>
            <Star starClick={handleStarClick} numberOfStars={1}/>
        </div>
    )

    //6 load products based on sub categories
    const showSubs = () => (
        subs.map((s) =>
            <div onClick={() => handleSub(s)}
                 className={"p-1 m-1 badge badge-secondary"}
                 style={{cursor : "pointer"}} key={s._id}>
                {s.name}
            </div>)
    )

    //7 load products based on brands
    const showBrands = () => (
        brands.map((b) =>
        <Radio key={b} value={b} name={b} checked={b === brand}
        onChange={handleBrand} className={"pb-1 pl-4 pr-4"}>
            {b}
        </Radio>)
    )

    //8 load products based on colors
    const showColors = () => (
        colors.map((c) =>
            <Radio key={c} value={c} name={c} checked={c === color}
                   onChange={handleColor} className={"pb-1 pl-4 pr-4"}>
                {c}
            </Radio>)
    )

    //9 load products based on shipping
    const showShipping = () => (
        <>
            <Checkbox className={"pb-2 pl-4 pr-4"}
                      onChange={handleShipping}
                      value={"Yes"} checked={shipping === "Yes"}>
                Yes </Checkbox>
            <br/>
            <Checkbox className={"pb-2 pl-4 pr-4"}
                      onChange={handleShipping}
                      value={"No"} checked={shipping === "No"}>
                No </Checkbox>
        </>
    )


    //handlers
    const handleSlider = (value) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload : {text : ""},
        })
        setCategoryIds([]);
        setStar("");
        setSub('');
        setBrand('');
        setColor('');
        setPrice(value);
        setShipping('');
        setTimeout(() => {
            setOk(!ok)
        }, 300)
    }
    const handleCheck = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload : {text : ""},
        })
        setPrice([0,0]);
        setStar("");
        setSub('')
        setBrand('')
        setColor('');
        setShipping('');
        //console.log(e.target.value);
        let inTheState = [...categoryIds]; //[0,1,2,3,4]
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked) //index or -1
        //indexOf method ?? if not found returns -1 else returns index
        if(foundInTheState === -1) {
            inTheState.push(justChecked)
        }else {
            //if found pull out one item from the index returned by indexOf method
            inTheState.splice(foundInTheState, 1);
        }
        setCategoryIds(inTheState);
        //console.log(inTheState);
        fetchProducts({category : inTheState})
    }
    const handleStarClick = (num) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload : {text : ""},
        })
        setCategoryIds([]);
        setPrice([0,0]);
        setSub('')
        setBrand('')
        setShipping('');
        setColor('');
        //console.log(num);

        setStar(num);
        fetchProducts({stars: num})
    }
    const handleSub = (sub) => {
        //console.log(sub)
        setSub(sub)
        dispatch({
            type: "SEARCH_QUERY",
            payload : {text : ""},
        })
        setCategoryIds([]);
        setPrice([0,0]);
        setStar('');
        setBrand('')
        setShipping('');
        setColor('');
        fetchProducts({sub : sub})
    }
    const handleBrand = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload : {text : ""},
        })
        setCategoryIds([]);
        setPrice([0,0]);
        setStar('');
        setSub('')
        setColor('');
        setShipping('');
        setBrand(e.target.value)
        fetchProducts({brand : e.target.value})
    }
    const handleColor = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload : {text : ""},
        })
        setCategoryIds([]);
        setPrice([0,0]);
        setStar('');
        setSub('');
        setBrand('');
        setShipping('');
        setColor(e.target.value)
        fetchProducts({color : e.target.value})
    }
    const handleShipping = (e) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload : {text : ""},
        })
        setCategoryIds([]);
        setPrice([0,0]);
        setStar('');
        setSub('');
        setBrand('');
        setColor('');
        setShipping(e.target.value);
        fetchProducts({shipping: e.target.value});
    }

    return(
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col-md-3 pt-2"}>
                    <h4>Search & Filter</h4>
                    <hr/>
                    <Menu defaultOpenKeys={['1', '2', '3', '4', '5', '6', '7']} mode={"inline"}>

                        {/*price*/}
                        <SubMenu key={"1"} title={<span className={"h6"}>
                            <DollarOutlined/> Price
                        </span>}>
                            <div>
                                <Slider className={"ml-4 mr-4"} max={4999}
                                tipFormatter={(v) => `Rs.${v}`}
                                range value={price} onChange={handleSlider}
                                />
                            </div>
                        </SubMenu>

                        {/*categories*/}
                        <SubMenu key={"2"} title={<span className={"h6"}>
                            <DownSquareOutlined/> Categories
                        </span>}>
                            <div>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        {/*star ratings*/}
                        <SubMenu key={"3"} title={<span className={"h6"}>
                            <StarOutlined/> Rating
                        </span>}>
                            <div>
                                {showStars()}
                            </div>
                        </SubMenu>

                        {/*Sub-categories*/}
                        <SubMenu key={"4"} title={<span className={"h6"}>
                            <DownSquareOutlined/> Sub-Categories
                        </span>}>
                            <div className={"pr-4 pl-4"}>
                                {showSubs()}
                            </div>
                        </SubMenu>

                        {/*Brands*/}
                        <SubMenu key={"5"} title={<span className={"h6"}>
                            <DownSquareOutlined/> Brands
                        </span>}>
                            <div className={"pr-5"}>
                                {showBrands()}
                            </div>
                        </SubMenu>

                        {/*Color*/}
                        <SubMenu key={"6"} title={<span className={"h6"}>
                            <DownSquareOutlined/> Colors
                        </span>}>
                            <div className={"pr-5"}>
                                {showColors()}
                            </div>
                        </SubMenu>

                        {/*Shipping*/}
                        <SubMenu key={"7"} title={<span className={"h6"}>
                            <DownSquareOutlined/> Shipping
                        </span>}>
                            <div className={"pr-5"}>
                                {showShipping()}
                            </div>
                        </SubMenu>


                    </Menu>
                </div>

                <div className={"col-md-9 pt-2"}>
                    {loading ? (
                        <h1 className={"text-danger container p-3 text-center"}>Loading...</h1>
                    ) : (
                        <h1 className={"container text-center p-3"}>Products</h1>
                    )}

                    {products.length<1 && <p className={"container text-center"}>No products found</p>}

                    <div className={"row pb-5"}>

                        {products.map((p) => (
                            <div key={p._id} className={"col-md-4 mt-3"}>
                                <ProductCard product={p} />
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    )

}

export default Shop