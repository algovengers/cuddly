import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PetCard from "../PetCard";
import exampleImg from "../../assets/main.jpeg";

export default function UserDetail({ setShowSidebar, showSidebar }) {
    const userData = useSelector((state: RootState) => state.user);
    return (
        <div className="user-details overflow-auto pb-4 bg-white">
            <div className="user-detail-header">
                <span
                    className="material-symbols-outlined menu-btn"
                    onClick={() => setShowSidebar(!showSidebar)}
                >
                    menu
                </span>
                <h1 className="userDetailsTitle">My Account</h1>
            </div>
            <ul className="user-detail-container">
                <li className="user-detail-element">
                    <span className="detail-title md:text-lg text-sm">
                        Name:
                    </span>
                    <span className="detail-value md:text-lg text-sm">
                        {userData.name}
                    </span>
                </li>
                {/* <li className="user-detail-element">
                    <span className="detail-title">Username:</span>
                    <span className="detail-value">johnsmith0123</span>
                </li> */}
                <li className="user-detail-element">
                    <span className="detail-title md:text-lg text-sm">
                        Email:
                    </span>
                    <span className="detail-value md:text-lg text-sm">
                        {userData.email}
                    </span>
                </li>
                {/* <li className="user-detail-element"><span className="detail-title">Username:</span><span className='detail-value'>newuserofcuddly</span></li> */}
            </ul>
            <div className="adopted-pet-list-container flex flex-col gap-6">
                <h1 className="userDetailsTitle font-normal">Adopted Pets</h1>
                <ul className="adopted-pet-list flex flex-wrap gap-4 md:justify-start justify-center">
                    <li className="adopted-pet-element" style={{}}>
                        <PetCard
                            image={exampleImg}
                            name={"Rocket"}
                            gender={"Male"}
                            breed={"Husky"}
                            location={"Kolkata"}
                        />
                    </li>
                    <li className="adopted-pet-element" style={{}}>
                        <PetCard
                            image={exampleImg}
                            name={"Rocket"}
                            gender={"Male"}
                            breed={"Husky"}
                            location={"Kolkata"}
                        />
                    </li>
                    <li className="adopted-pet-element" style={{}}>
                        <PetCard
                            image={exampleImg}
                            name={"Rocket"}
                            gender={"Male"}
                            breed={"Husky"}
                            location={"Kolkata"}
                        />
                    </li>
                    <li className="adopted-pet-element" style={{}}>
                        <PetCard
                            image={exampleImg}
                            name={"Rocket"}
                            gender={"Male"}
                            breed={"Husky"}
                            location={"Kolkata"}
                        />
                    </li>
                </ul>
            </div>
            <div className="Rehomed-pet-list-container flex flex-col gap-6 mt-8 ">
                <h1 className="userDetailsTitle font-normal">Pets Rehomed</h1>
                <ul className="adopted-pet-list flex flex-wrap gap-4 md:justify-start justify-center">
                    <li className="adopted-pet-element" style={{}}>
                        <PetCard
                            image={exampleImg}
                            name={"Rocket"}
                            gender={"Male"}
                            breed={"Husky"}
                            location={"Kolkata"}
                        />
                    </li>
                    <li className="adopted-pet-element" style={{}}>
                        <PetCard
                            image={exampleImg}
                            name={"Rocket"}
                            gender={"Male"}
                            breed={"Husky"}
                            location={"Kolkata"}
                        />
                    </li>
                    <li className="adopted-pet-element" style={{}}>
                        <PetCard
                            image={exampleImg}
                            name={"Rocket"}
                            gender={"Male"}
                            breed={"Husky"}
                            location={"Kolkata"}
                        />
                    </li>
                    <li className="adopted-pet-element" style={{}}>
                        <PetCard
                            image={exampleImg}
                            name={"Rocket"}
                            gender={"Male"}
                            breed={"Husky"}
                            location={"Kolkata"}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
}
