import { Link } from "react-router-dom";

function UserDetails({ age, gender, occupation, hobbies }) {
    return (
        <>
            <p>Age : {age}</p>
            <p>Gender : {gender}</p>
            <p>Occupation : {occupation}</p>
            <p>Hobbies : {hobbies.join(", ")}</p>
            <Link to="/moredetails">Click here to see more details</Link>
        </>
    );
}

export default UserDetails;