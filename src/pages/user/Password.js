import React, {useState} from 'react';
import UserNav from "../../components/nav/UserNav";
import {auth} from "../../firebase";
import {toast} from "react-toastify";

const Password = () => {

    const [password, setpassword] = useState("")
    const [loading, setLoading]= useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        //console.log(password)

        await auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false)
                setpassword("")
                toast.success("Password Successfully Updated")
            })
            .catch( err => {
                setLoading(false)
                toast.error(err.message)
            })
    }

    const passwordUpdateForm = () =>
        <form onSubmit={handleSubmit}>
            <div className={"form-group"}>
                <lable>Your Password</lable>

                <input type={"password"} onChange={ (e) => setpassword(e.target.value)}
                className={"form-control"} placeholder={"Enter new password"} disabled={loading}
                value={password}/>
                <br/>
                <button className={"btn btn-primary"} disabled={!password || password.length<6 || loading}>Submit</button>

            </div>
        </form>


    return (
        <div className="container-fluid">
        <div className="row">
            <div className={"col-md-2"}>
                <UserNav/>
            </div>
            <div className="col">
             {loading ? (<h4 className={"text-danger"}>Loading.. </h4>) :
                (<h2 className={"text-center mt-3 mb-2 bg-info p-2"}>Password Update</h2>)}
                <hr/>
                {passwordUpdateForm()}

            </div>
        </div>
        </div>
    )
};

export default Password;
