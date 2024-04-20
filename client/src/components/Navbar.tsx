import { RootState } from '@/redux/store';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";
import { Loader2 } from "lucide-react";
import logout from "@/utils/logout";
import { unsetUser } from "@/redux/user";

function Navbar() {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user); // Assuming 'user' is your user slice name

  async function handleLogout() {
    if (await logout()) {
      dispatch(unsetUser());
    }
  }
  return (
    <header className="home-header">
        <Link to='/'>

    <h1 className="logo">Cuddly</h1>

        </Link>
    <div
      className={`navbut ${toggleMenu && "open"}`}
      onClick={() => setToggleMenu((prev) => !prev)}
    >
      {toggleMenu ? <RiCloseFill /> : <RiMenu2Fill />}
    </div>
    <ul className={`nav ${toggleMenu && "open"}`}>
      <li className="nav-item">
        <Link to="/discover" className="nav-link">
          Adopt a pet
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/upload" className="nav-link">
          Rehome
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/chatwithai" className="nav-link">
          Chat with AI
        </Link>
      </li>
      <li className="nav-item">
       { user.isAuth === true &&

<Link to='/profile' className='nav-link'>
            Profile
       </Link>

}
</li>
      <li className="nav-item">
        <button
          className="login-btn"
          onClick={() =>
            user.isLoading === false &&
            (user.isAuth === true ? handleLogout() : navigate("/login"))
          }
        >
          {user.isLoading === true ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : user.isAuth === true ? (
            "Logout"
          ) : (
            "Login"
          )}
        </button>
      </li>
    </ul>
  </header>
  )
}

export default Navbar