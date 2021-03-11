import React from 'react'
import {Select} from "antd";


const {Option} = Select;

const ProductCreateForm = ({handleSubmit,handleChange,setValues, subOptions, showSub, values, handleCategoryChange }) => {

    //destructuring all the fields
    const {title, description, price,categories,
        category, subs,shipping,quantity, images, colors, color,
        brands, brand} = values;

    return (
        <form onSubmit={handleSubmit}>
            <div className={"form-group"}>
                <label>Title</label>
                <input name={"title"} type={"text"}
                       className={"form-control"} autoFocus
                       value={title} onChange={handleChange}/>
            </div> <br/>

            <div className={"form-group"}>
                <label>Description</label>
                <input name={"description"} type={"text"}
                       className={"form-control"}
                       value={description} onChange={handleChange}/>
            </div> <br/>

            <div className={"form-group"}>
                <label>Price</label>
                <input name={"price"} type={"number"}
                       className={"form-control"}
                       value={price} onChange={handleChange}/>
            </div> <br/>

            <div className={"form-group"}>
                <label>Shipping</label>
                <select name={"shipping"}
                        className={"form-control"}
                        onChange={handleChange}>
                    <option> Please Select </option>
                    <option value={"Yes"}> Yes </option>
                    <option value={"No"}> No </option>
                </select>
            </div> <br/>

            <div className={"form-group"}>
                <label>Quantity</label>
                <input name={"quantity"} type={"number"}
                       className={"form-control"}
                       value={quantity} onChange={handleChange}/>
            </div> <br/>

            <div className={"form-group"}>
                <label>Color</label>
                <select name={"color"}
                        className={"form-control"}
                        onChange={handleChange}>
                    <option> Please Select </option>
                    {colors.map((c) => <option key={c} value={c}>
                        {c}
                    </option> )}
                </select>
            </div> <br/>

            <div className={"form-group"}>
                <label>Brand</label>
                <select name={"brand"}
                        className={"form-control"}
                        onChange={handleChange}>
                    <option> Please Select </option>
                    {brands.map((b) => <option key={b} value={b}>
                        {b}
                    </option> )}
                </select>
            </div> <br/>

            <div className={"form-group"}>
                <label>Category </label>
                <select name={"category"} className={"form-control"}
                        onChange={handleCategoryChange}>
                    <option>Please Select</option>
                    {categories.length>0 && categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>))}
                </select>
            </div> <br/>

            {showSub && <div>
                <label>Sub - Categories </label>
                <Select mode={"multiple"} value={subs}
                        style={{width: '100%'}} placeholder={"Please Select"}
                        onChange={(value) => setValues({...values, subs: value})}>

                    {subOptions.length && subOptions.map((s) =>
                        (<Option key={s._id} value={s._id}>
                            {s.name}
                        </Option>))}

                </Select>
            </div> } <br/>


            <button className={"btn btn-outline-info"}>Save Product</button>

        </form>
    )
}

export default ProductCreateForm