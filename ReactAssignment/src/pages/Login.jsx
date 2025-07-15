import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const OnSubmit = async (data) => {
        // const userData = JSON.parse(localStorage.getItem(data.email));
        // if (userData) {
        //     if (userData.password === data.password) {
        //         localStorage.setItem("isLoggedIn", true)
        //         navigate("/private");
        //         console.log(userData.name + " You Are Successfully Logged In");
        //     } else {
        //         console.log("Email or Password is not matching with our record");
        //     }
        // } else {
        //     console.log("Email or Password is not matching with our record");
        // }
        const res = await axios.post('http://localhost:3000/login',{
            email : data.email,
            password : data.password
        })
        if(res.data.success){
            navigate("/private")
            console.log("Login succesful!")
        }
    }
    return (
        <>
            <form className="Login-form" onSubmit={handleSubmit(OnSubmit)}>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                />
                {errors.email && <span style={{ color: "red" }}>*Email* is mandatory</span>}

                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                />
                {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}
                <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    )
}
export default Login