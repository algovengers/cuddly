import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function UserDetail() {
    const userData = useSelector((state: RootState) => state.user);
    return (
        <div className="user-details">
            <h1 className="userDetailsTitle">My Account</h1>
            <ul className="user-detail-container">
                <li className="user-detail-element">
                    <span className="detail-title">Name:</span>
                    <span className="detail-value">{userData.name}</span>
                </li>
                {/* <li className="user-detail-element">
                    <span className="detail-title">Username:</span>
                    <span className="detail-value">johnsmith0123</span>
                </li> */}
                <li className="user-detail-element">
                    <span className="detail-title">Email:</span>
                    <span className="detail-value">{userData.email}</span>
                </li>
                {/* <li className="user-detail-element"><span className="detail-title">Username:</span><span className='detail-value'>newuserofcuddly</span></li> */}
            </ul>
        </div>
    );
}
