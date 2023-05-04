import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <button className="navbar__item" onClick={() => {navigate('/')}}>
                Home
            </button>
            <button className="navbar__item" onClick={() => {navigate('/games')}}>
                Games
            </button>
            <button className="navbar__item" onClick={() => {navigate('/events')}}>
                Events
            </button>
            {
                (localStorage.getItem("lu_token") !== null) ?
                    <li className="navbar__item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("lu_token")
                                navigate('/login')
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}
