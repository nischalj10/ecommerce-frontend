import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {getProduct} from "../../../functions/product";
import {getCategories, getCategorySubs} from "../../../functions/category";
import { updateProduct } from "../../../functions/product";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import FileUpload from "../../../components/forms/FileUpload";
import {LoadingOutlined} from "@ant-design/icons";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
};


const ProductUpdate = ({match, history}) => {

    // redux
    const { user } = useSelector((state) => ({ ...state }));
    //router
    const {slug} = match.params;
    //state
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([])
    const [arrayOfSubIDs, setArrayOfSubIDs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading]= useState(false);
    
    useEffect(() => {
            loadProduct();
            loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(slug)
            .then((p)=> {
                //console.log("SINGLE PRODUCT", p)
                //1 load single product
                setValues({...values, ...p.data})
                //2 load the loaded product's subs id array
                getCategorySubs(p.data.category._id)
                    .then((res) => {
                        setSubOptions(res.data) //on first load, show selected subs
                    })
                //3 prepare array of sub ids because antd Select only accepts that in values attribute
                let arr = []
                p.data.subs.map((s) => {
                    arr.push(s._id);
                })
                console.log("ARRAY OF SUB IDs", arr);
                setArrayOfSubIDs((prev) => arr); //required for antd select to work
            })
            .catch((err) => {
                console.log("PRODUCT LOADING IN STATE ERROR",err)
            })
    }

    const loadCategories = () =>
        getCategories().then((c) => setCategories(c.data));


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubIDs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`)
                history.push("/admin/products");
            }).catch((err) => {
            console.log(err);
            // if (err.response.status === 400) toast.error(err.response.data);
            setLoading(false);
            toast.error(err.response.data.err);

        })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log(e.target.name, " ----- ", e.target.value);
    };

  const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: []});

        setSelectedCategory(e.target.value);

        getCategorySubs(e.target.value).then((res) => {
            //console.log("SUB OPTIONS ON CATEGORY CLICK", res);
            setSubOptions(res.data);
        })
      //if user clicks back to the original category so its sub categories
      // are pre-loaded
      if(values.category._id === e.target.value){
            loadProduct();
        }
        else setArrayOfSubIDs([]);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? <LoadingOutlined className={"text-danger h1"}/> :
                        <h2>Product Update</h2>}

                    <hr/>

                    {/*{JSON.stringify(values)}*/}

                    <div className={"p-3"}>
                        <FileUpload values={values} setValues={setValues}
                        setLoading={setLoading}/>
                    </div><br/>


                    <ProductUpdateForm handleChange={handleChange}
                    handleSubmit={handleSubmit} values={values}
                    setValues={setValues} categories={categories}
                    handleCategoryChange={handleCategoryChange}
                    subOptions={subOptions} arrayOfSubIDs={arrayOfSubIDs}
                    setArrayOfSubIDs={setArrayOfSubIDs}
                    selectedCategory={selectedCategory}/>

                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
