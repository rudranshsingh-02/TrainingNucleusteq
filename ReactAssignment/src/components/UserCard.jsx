import UserDetails from "./UserDetails"

function UserCard({user}) {
    return (
        <>
            <h1>{user.name}'s Details</h1>
            <UserDetails
             age={user.age} 
             gender={user.gender} 
             occupation={user.occupation} 
             hobbies={user.hobbies}
             />
        </>
    )
}
export default UserCard