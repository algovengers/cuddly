import { Button } from "@/components/ui/button";
import { useState } from "react";
import Markdown from "react-markdown";
import { FiArrowRight } from "react-icons/fi";

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

function Chat({ text, own, isLoading = false }: ChatMessage) {
  return (
    <div
      className={`${""} ${own && "pt-[20px] pb-[10px]"} ${
        !own && "border-b-[1px] border-zinc-400 pt-[10px] pb-[20px]"
      }`}
    >
      <div
        className={`${""} ${
          own &&
          "p-[10px] bg-white rounded-lg w-fit shadow-[0_0_5px_3px_rgba(0,0,0,0.05),0_0_1px_1px_rgba(0,0,0,0.07)]"
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
  const [chat, setChat] = useState<ChatMsg[]>(dummyChat);
  return (
    <div className="px-4 bg-zinc-100 flex-grow pagecont">
      <div className="min-h-full">
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
        </div>
        <div className="fixed bottom-4 p-[6px] w-[calc(100%-16px*2)] bg-white shadow-[0_0_5px_3px_rgba(0,0,0,0.1),0_0_1px_1px_rgba(0,0,0,0.1)] rounded-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
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
            {/* <ImageChatPopup chatState={chatState} setChatState={setChatState} /> */}
            <Button
              onClick={() => {
                // handleClick();
              }}
              //   disabled={chatState === "busy" ? true : false}
            >
              <FiArrowRight />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAi;
