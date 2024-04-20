import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { FiArrowRight } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/redux/store";
import { getChat, addHumanChat, addAichat } from "@/redux/chatSlice";
import axios from "axios";
import LoadingComponent from "@/components/LoadingComponent";
import Navbar from "@/components/Navbar";

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
  const user = useSelector((state: RootState) => state.user); // Assuming 'user' is your user slice name
  const history = useNavigate();
  const dispatch = useDispatch();
  const chat = useSelector((state: RootState) => state.chat);
  const [animation, setAnimation] = useState(false);

  // useEffect(() => {
  //   if (!user.isLoading && !user.isAuth) {
  //     // Redirect to login page
  //     history("/login");
  //   }
  //   // console.log("gg", user.isAuth);
  //   // console.log("ggs", user);
  // }, [user.isAuth, history, user.isLoading]);

  // useEffect(() => {
  //   // if (user.email) {
  //     // const formData = new FormData();
  //     // formData.append('chat',message)
  //     // axios.post(`https://cuddly-azcl.onrender.com/`,{formData}).then((response) => {
  //     //   const messages = response.data.data.messages;

  //     //   const data = messages.map((m) => {
  //     //     const r = {
  //     //       own: false,
  //     //       message: "",
  //     //     };
  //     //     if (m.id[2] == "HumanMessage") r.own = true;
  //     //     r.message = m.kwargs.content;
  //     //     return r;
  //     //   });
  //     //   dispatch(getChat(data));
  //     // });
  // }, []);

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
    setAnimation(true);
    e.preventDefault();
    dispatch(addHumanChat({ own: true, message }));
    setMessage("");

    const requestData = {
      sessionId: user.email,
      message,
    };
    let formData = new FormData();
    const response = await axios.post(import.meta.env.VITE_CHAT_PATH, {
      chat: message,
    });
    console.log(response);
    // const reader = response.body!.getReader();
    // const decoder = new TextDecoder("utf-8");
    // let responseText = "";
    const ans = response.data.result;
    dispatch(addAichat({ own: false, message: ans }));
    // while (true) {
    //   const chunk = await reader.read();
    //   const { done, value } = chunk;
    //   if (done) {
    //     break;
    //   }
    //   const decodedChunk = decoder.decode(value);
    //   responseText += decodedChunk;

    // }
    // Define a function to read chunks of data from the stream

    // Start reading the stream
    setAnimation(false);
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
