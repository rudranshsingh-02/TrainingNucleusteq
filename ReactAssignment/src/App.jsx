import './App.css'
import { useNavigate } from "react-router-dom";
import UserCard from './components/UserCard'

function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  const user = {
    name: "Rudransh",
    age: "21",
    gender: "Male",
    occupation: "Student",
    hobbies: ["Coding", "Reading", "Cricket", "Writing"]
  }
  return (
    <>
      <UserCard user={user} />
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
export default App