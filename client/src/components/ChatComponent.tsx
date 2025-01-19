import { FiArrowRight } from "react-icons/fi";
import { Button } from "./ui/button";
import { Chat } from "@/pages/ChatWithAi";
import useAiChat from "@/hooks/useAiChat";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatComponent() {
  const { addMessage } = useAiChat();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  return (
    <div className="rounded-lg relative w-full">
      <div className="p-4 bg-secondary rounded-t-lg flex gap-4">
        <div className="p-2 rounded-full bg-primary w-10 h-10">C</div>
        <div className="text-start">
          <div className="text-white">Cuddly Bot</div>
          <div className="text-green-600 text-sm">
            <span className="text-green-400 text-sm flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Online
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-b-lg flex flex-col gap-4 items-start p-4">
        <Chat own={false} text="How can I help you with your pet today?" />

        <div className=" p-[6px] w-full bg-white shadow-[0_0_5px_3px_rgba(0,0,0,0.1),0_0_1px_1px_rgba(0,0,0,0.1)] rounded-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/chatwithai");
              addMessage(message, () => {
                setMessage("");
              });
            }}
            className="flex gap-[6px]"
          >
            <input
              type="text"
              className=" appearance-none border-none outline-none w-full bg-transparent mx-[6px]"
              placeholder="Describe your problem ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
            >
              <FiArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
