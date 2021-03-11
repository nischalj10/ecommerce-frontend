import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {createCategory, getCategories, removeCategory} from "../../../functions/category";
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";



const CategoryCreate = () => {
    const {user} =  useSelector((state)=>({...state}))

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const loadCategories = () => getCategories().then((c) => setCategories(c.data));

    //search and filter step1
    const [keyword, setKeyword] = useState("")


    useEffect(()=>{
        loadCategories();
    }, [])


    const handleRemove = async (slug) => {
        let answer = window.confirm("Do you want to delete this category?")
        //console.log(answer, slug);
        if(answer){
            setLoading(true)
            removeCategory(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.error(`${res.data.name} category deleted successfully.`)
                    loadCategories();
                })
                .catch((err) => {
                    if(err.response.status === 400){
                        setLoading(false)
                        toast.error(err.response.data)
                    }
                })

        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true);
        createCategory({ name }, user.token)
            .then(res => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadCategories();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setName("");
                if (err.response.status === 400) toast.error(err.response.data);
            });
    }


    // search and filter step 4

    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className={"col-md-2"}>
                    <AdminNav/>
                </div>
                <div className="col">
                    {loading ? <h2 className={"text-danger text-center mt-3 mb-2 bg-info p-2"}> Loading ..</h2> :
                        <h2 className={"text-center mt-3 mb-2 bg-info p-2"}> Create Category</h2>}
                        <hr/> <br/>
                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}/>


                    <hr/>
                    <br/>

                    {/* step 2 and step 3 are moved to separate file*/}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/*step 5 search and filter*/}
                    {categories.filter(searched(keyword)).map((c) => (
                    <div className={"alert alert-secondary"} key={c._id}>
                        {c.name}
                        <span onClick={() => handleRemove(c.slug)} className={"btn btn-sm float-right"}>
                            <DeleteOutlined className={"text-danger"} />
                        </span>
                        <Link to={`/admin/category/${c.slug}`}>
                            <span className={"btn btn-sm float-right"}>
                                <EditOutlined className={"text-warning"} />
                            </span>
                        </Link>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoryCreate