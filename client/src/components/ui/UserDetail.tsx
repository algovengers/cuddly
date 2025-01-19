import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import PetCard from "../PetCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDetail({ setShowSidebar, showSidebar }) {
  const userData = useSelector((state: RootState) => state.user);
  const [petsData, setPetsData] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_PATH}/api/petListing`, {
        withCredentials: true,
      })
      .then((res) => {
        return res.data.data;
      })
      .then((data) => {
        setPetsData(data);
      });
  }, []);

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
          <span className="detail-title md:text-lg text-sm">Name:</span>
          <span className="detail-value md:text-lg text-sm">
            {userData.name}
          </span>
        </li>
        <li className="user-detail-element">
          <span className="detail-title md:text-lg text-sm">Email:</span>
          <span className="detail-value md:text-lg text-sm">
            {userData.email}
          </span>
        </li>
      </ul>
      <div className="Rehomed-pet-list-container flex flex-col gap-6 mt-8 ">
        <h1 className="userDetailsTitle font-normal">Your Pets</h1>
        <ul className="adopted-pet-list flex flex-wrap gap-4 md:justify-start justify-center">
          {petsData.map((data) => (
            <li className="adopted-pet-element" >
              <PetCard
                image={data.Image}
                name={data.name}
                gender={data.gender}
                breed={data.breed}
                location={data.city}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
