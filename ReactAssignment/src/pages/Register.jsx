import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = async (data) => {
        const res = await axios.post("http://localhost:3000/register", {
            name: data.name,
            email: data.email,
            password: data.password
        });
        if (res.data.success) {
            console.log("User Registered, you can now log in")
            navigate("/login")
        } else {
            console.log("Register failed")
        }
    }
    return (
        <>
            <form className="Register-form" onSubmit={handleSubmit(onSubmit)}>
                <label>Enter name: </label>
                <input
                    type="text"
                    placeholder="Enter name"
                    {...register("name", { required: true })}
                />
                {errors.name && <span style={{ color: "red" }}>*Name* is mandatory</span>}
                <label>Enter email: </label>
                <input
                    type="email"
                    placeholder="Enter email"
                    {...register("email", { required: true })}
                />
                {errors.email && <span style={{ color: "red" }}>*Email* is mandatory</span>}
                <label>Enter passwword: </label>
                <input
                    type="password"
                    placeholder="Enter password"
                    {...register("password", { required: true })}
                />
                {errors.password && <span style={{ color: "red" }}>*Password* is mandatory</span>}
                <input type="submit" style={{ backgroundColor: "#a1eafb" }} />
            </form>
        </>
    )
}
export default Register