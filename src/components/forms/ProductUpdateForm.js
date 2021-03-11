import React from 'react'
import {Select} from "antd";


const {Option} = Select;

const ProductUpdateForm = ({arrayOfSubIDs,handleSubmit,categories,
                           subOptions,handleChange,setValues,
                           values, handleCategoryChange, setArrayOfSubIDs,
                           selectedCategory}) => {

    //destructuring all the fields
    const {title, description, price,
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
                <select value={shipping === 'Yes' ? 'Yes' : 'No'} name={"shipping"}
                        className={"form-control"}
                        onChange={handleChange}>
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
                <select value={color} name={"color"}
                        className={"form-control"}
                        onChange={handleChange}>
                    {colors.map((c) => <option key={c} value={c}>
                        {c}
                    </option> )}
                </select>
            </div> <br/>

            <div className={"form-group"}>
                <label>Brand</label>
                <select  value={brand} name={"brand"}
                        className={"form-control"}
                        onChange={handleChange}>
                    {brands.map((b) => <option key={b} value={b}>
                        {b}
                    </option> )}
                </select>
            </div> <br/>

            <div className={"form-group"}>
                <label>Category </label>
                <select name={"category"} className={"form-control"}
                        onChange={handleCategoryChange}
                        value={selectedCategory ? selectedCategory: category._id}>

                    {categories.length>0 && categories.map((c) => (
                        <option key={c._id} value={c._id}>
                            {c.name}
                        </option>))}
                </select>
            </div> <br/>

            <div>
                <label>Sub - Categories </label>
                <Select mode={"multiple"} value={arrayOfSubIDs}
                        style={{width: '100%'}} placeholder={"Please Select"}
                        onChange={(value) => setArrayOfSubIDs(value)}>

                    {subOptions.length && subOptions.map((s) =>
                        (<Option key={s._id} value={s._id}>
                            {s.name}
                        </Option>))}

                </Select>
            </div>  <br/>

            <button className={"btn btn-outline-info"}>Update Product</button>

        </form>
    )
}

export default ProductUpdateForm