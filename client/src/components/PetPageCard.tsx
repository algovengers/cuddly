import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function PetPageCard({ owner }) {
  const userData = useSelector((data: RootState) => data.user);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col bg-white p-2">
        <div className="text-muted-foreground text-sm">Owner </div>
        <div className="py-2">
          <div className="font-medium"> {owner.name} </div>
        </div>

        <div></div>
      </div>

      {userData.email !== owner.emailId && (
        <div>
          <Button
            onClick={async () => {
              await axios.post(
                `${import.meta.env.VITE_BACKEND_PATH}/api/userchat/createchat`,
                {
                  userId1: userData.email,
                  name1: userData.name,
                  userId2: owner.emailId,
                  name2: owner.name,
                },
                { withCredentials: true }
              );
              navigate("/profile");
            }}
          >
            Chat with the Owner
          </Button>
        </div>
      )}
    </div>
  );
}

export default PetPageCard;
