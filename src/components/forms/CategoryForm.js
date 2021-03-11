import React from 'react'

const CategoryForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={"form-group"}>
                <label>Name</label>
                <input type={"text"} className={"form-control"} value={props.name}
                       onChange={(e) =>props.setName(e.target.value) }
                       autoFocus required/>
                <br/>
                <button className={"btn btn-outline-primary"}> Save </button>

            </div>
        </form>
    )

}

export default CategoryForm