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
    const [tab, setTab] = useState(1);
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
            <div className="sidebar">
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
                        onClick={() => setTab(1)}
                    >
                        My Account
                    </li>
                    <li
                        className={`side-nav-items ${
                            tab === 2 ? "active-side-nav" : ""
                        }`}
                        onClick={() => setTab(2)}
                    >
                        Chats
                    </li>
                    <li
                        className={`side-nav-items ${
                            tab === 3 ? "active-side-nav" : ""
                        }`}
                    >
                        Rehome Status
                    </li>
                    <li
                        className={`side-nav-items ${
                            tab === 4 ? "active-side-nav" : ""
                        }`}
                    >
                        Adoption Status
                    </li>
                </ul>
            </div>
            <div className="main-box">
                {tab === 1 && <UserDetail />}

                {tab === 2 && <ChatBox />}
            </div>
        </div>
    );
}

export default Profile;
