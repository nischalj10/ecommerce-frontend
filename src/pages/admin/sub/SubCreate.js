import React, {useState, useEffect} from 'react'
import AdminNav from "../../../components/nav/AdminNav";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {getCategories} from "../../../functions/category";
import {createSub,getSubs, removeSub} from "../../../functions/sub";
import {Link} from 'react-router-dom'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";



const SubCreate = () => {
    const {user} =  useSelector((state)=>({...state}))
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [subs, setSubs] = useState([]);

    //search and filter step1
    const [keyword, setKeyword] = useState("")


    useEffect(()=>{
        loadCategories();
        loadSubs();
    }, [])

    const loadCategories = () => getCategories().then((c) => setCategories(c.data));

    const loadSubs = () => getSubs().then((s) => setSubs(s.data));

    const handleRemove = async (slug) => {
        let answer = window.confirm("Do you want to delete this sub-category?")
        //console.log(answer, slug);
        if(answer){
            setLoading(true)
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false)
                    toast.error(`${res.data.name} sub-categroy deleted successfully.`)
                    loadSubs();
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
        createSub({ name, parent : category }, user.token)
            .then(res => {
                // console.log(res)
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is created`);
                loadSubs();
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
                        <h2 className={"text-center mt-3 mb-2 bg-info p-2"}> Create Sub-category</h2>}
                    <hr/>

                    <div className={"form-group"}>
                        <label>Parent Category </label>
                        <select name={"category"} className={"form-control"}
                        onChange={(e) => setCategory(e.target.value)}>
                            <option>Please Select</option>
                            {categories.length>0 && categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>))}
                        </select>
                    </div>

                    <br/>

                    {/*{JSON.stringify(category)}*/}

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}/>


                    <hr/>
                    <br/>

                    {/* step 2 and step 3 are moved to separate file*/}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />

                    {/*step 5 search and filter*/}
                    {subs.filter(searched(keyword)).map((s) => (
                        <div className={"alert alert-secondary"} key={s._id}>
                            {s.name}
                            <span onClick={() => handleRemove(s.slug)} className={"btn btn-sm float-right"}>
                            <DeleteOutlined className={"text-danger"} />
                        </span>
                            <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate