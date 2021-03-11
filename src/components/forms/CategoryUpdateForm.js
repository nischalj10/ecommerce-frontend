import React from 'react'

const CategoryUpdateForm = ({handleSubmit, name, setName}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className={"form-group"}>
                <label>New Name</label>
                <input type={"text"} className={"form-control"} value={name}
                       onChange={(e) =>setName(e.target.value) }
                       autoFocus required/>
                <br/>
                <button className={"btn btn-outline-primary"}> Update </button>

            </div>
        </form>
    )

}

export default CategoryUpdateForm