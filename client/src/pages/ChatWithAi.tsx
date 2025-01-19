import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import LoadingComponent from "@/components/LoadingComponent";
import Navbar from "@/components/Navbar";
import useAiChat from "@/hooks/useAiChat";

interface ChatMessage {
  text: string;
  own: boolean;
  imgLink?: string;
  isLoading?: boolean;
}

interface ChatMsg {
  message: string;
  own: boolean;
  imgLink?: string;
  isLoading?: boolean;
}

const dummyChat: ChatMsg[] = [
  {
    message: "hello",
    own: true,
  },
  {
    message: "hey this your ai",
    own: false,
  },
  {
    message: "how are you",
    own: true,
  },
  {
    message: "i am fine",
    own: false,
  },
];

export function Chat({ text, own, isLoading = false }: ChatMessage) {
  return (
    <div
      className={`${""} ${own && "pt-[20px] pb-[10px] "} ${
        !own && " border-zinc-400 pt-[10px] pb-[20px]"
      }`}
    >
      <div
        className={`${"shadow-[0_0_5px_3px_rgba(0,0,0,0.05),0_0_1px_1px_rgba(0,0,0,0.07)]"} ${
          own && "p-[10px] bg-primary rounded-lg rounded-br-none w-fit ml-auto"
        } ${
          !own &&
          "bg-white p-[10px] text-neutral-800 rounded-lg rounded-tl-none w-fit"
        }`}
      >
        <Markdown>{text}</Markdown>
      </div>
      {isLoading && (
        <div className="bg-[#00000099] w-[16px] h-[16px] rounded-full"></div>
      )}
    </div>
  );
}
const ChatWithAi = () => {
  const [message, setMessage] = useState<string>("");
  const { addMessage } = useAiChat();
  const chat = useSelector((state: RootState) => state.chat);

  const animation = useSelector((state: RootState) => state.animation);

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  function scrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth", // Optional, adds smooth scrolling effect
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    addMessage(message, () => setMessage(""));
  }

  return (
    <div className="bg-zinc-100 h-screen">
      <Navbar />
      <div className="px-4 bg-zinc-100 flex-grow pagecont  ">
        <div className="min-h-full  pb-20">
          <div className=" mx-4">
            {/*!chatInit && (
            <div>
            <LoaderRipple />
            </div>
          )*/}
            {/*chatInit && chat.length === 0 && (
            <div className="flex justify-center items-center min-h-[calc(100vh-130px)]">
            <div>
            Having questions about Animals or Pets?
            <br />
            Chat with me now.
            </div>
            </div>
          )*/}
            {
              /*chatInit &&
            chat &&*/
              chat?.map((item, i) => (
                <Chat
                  text={item.message}
                  isLoading={item.isLoading}
                  own={item.own}
                  imgLink={item.imgLink}
                  key={i}
                />
              ))
            }
            {animation && (
              <div className="mt-4">
                <LoadingComponent />
              </div>
            )}
          </div>
          <div className="fixed bottom-4 p-[6px] w-[calc(100%-16px*2)] bg-white shadow-[0_0_5px_3px_rgba(0,0,0,0.1),0_0_1px_1px_rgba(0,0,0,0.1)] rounded-lg">
            <form onSubmit={handleSubmit} className="flex gap-[6px]">
              <input
                type="text"
                className=" appearance-none border-none outline-none w-full bg-transparent mx-[6px]"
                placeholder="Describe your problem ..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {/* <ImageChatPopup chatState={chatState} setChatState={setChatState} /> */}
              <Button
                type="submit"
                //   disabled={chatState === "busy" ? true : false}
              >
                <FiArrowRight />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAi;
