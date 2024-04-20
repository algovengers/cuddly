// import UserDetail from '@/components/ui/sUserDetail'
import ChatBox from "@/components/ui/ChatBox";
import profilePic from "../assets/home4.png";

import "./profile.css";
import UserDetail from "@/components/ui/UserDetail";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setChat } from "@/redux/userChatSlice";

function Profile() {
    const [tab, setTab] = useState(2);
    const [showSidebar,setShowSidebar] = useState(false)

    const userData = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setChat([]));
        dispatch({
            type: "socket/connect",
        });
        return () => {
            dispatch({
                type: "socket/disconnect",
            });
        };
    }, [userData.email]);
    return (
        <div className="profile-container">
            <div className={`sidebar ${showSidebar ? "show-sidebar":""}`}>
            <span className="material-symbols-outlined close-menu-btn sidebar-back-btn" onClick={()=>setShowSidebar(!showSidebar)}>keyboard_backspace</span>
                <div className="user-header">
                    <div className="profile-pic-container">
                        <img
                            src={profilePic}
                            alt="/image"
                            className="profile-pic"
                        />
                    </div>
                    <span className="user-name">{userData.name}</span>
                </div>
                    
                <ul className="side-nav">
                    <li
                        className={`side-nav-items ${
                            tab === 1 ? "active-side-nav" : ""
                        }`}
                        onClick={() => {setTab(1);
                            setShowSidebar(!showSidebar);
                        }}
                    >
                        My Account
                    </li>
                    <li
                        className={`side-nav-items ${
                            tab === 2 ? "active-side-nav" : ""
                        }`}
                        onClick={() => {setTab(2);
                            setShowSidebar(!showSidebar);
                        }}
                    >
                        Chats
                    </li>
                </ul>
            </div>
            <div className="main-box">
                {tab === 1 && <UserDetail setShowSidebar={setShowSidebar} showSidebar={showSidebar} />}

                {tab === 2 && <ChatBox setShowSidebar={setShowSidebar} showSidebar={showSidebar} />}
            </div>
        </div>
    );
}

export default Profile;
