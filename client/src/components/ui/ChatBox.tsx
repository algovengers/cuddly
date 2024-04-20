import { useDispatch, useSelector } from "react-redux";
import profilePic from "../../assets/home4.png";
import sampleImg from "../../assets/main.jpeg";
import MessageItem from "./MessageItem";
import { RootState } from "@/redux/store";
import { adduserChatMessage, changeIndex } from "@/redux/userChatSlice";

import { FormEvent, useEffect, useReducer, useRef, useState } from "react";

export default function ChatBox({ setShowSidebar, showSidebar }) {
    const userChatData = useSelector((state: RootState) => state.userChat);
    const userData = useSelector((state: RootState) => state.user);
    const [showChatting, setShowChatting] = useState(false);

    return (
        <div className="user-chats">
            <div className="chat-list">
                <div className="chatlist-header">
                    <span
                        className="material-symbols-outlined menu-btn"
                        onClick={() => setShowSidebar(!showSidebar)}
                    >
                        menu
                    </span>
                    <h1 className="chatListHeading">Chats</h1>
                </div>

                <ul className="chats">
                    {userChatData?.chats?.map(({ id, users }, i) => {
                        const data = users.find(
                            (data) => data.userId != userData.email
                        );

                        return (
                            <SidechatViewer
                                name={data.name || "AFTAB"}
                                // name={"AFTAB"}
                                key={id}
                                index={i}
                                setShowChatting={setShowChatting}
                            />
                            // We are not sending images...
                        );
                    })}
                </ul>
            </div>
            {showChatting && userChatData.index != -1 && (
                <ChatBoxContainer setShowChatting={setShowChatting} />
            )}
        </div>
    );
}

function SidechatViewer({ name, index, setShowChatting }) {
    const dispatch = useDispatch();
    return (
        <li
            className="chat-item"
            onClick={() => {
                dispatch(changeIndex({ index }));
                setShowChatting(true);
            }}
            // onClick={()=>}
        >
            <div className="chat-pic-container">
                <img src={profilePic} alt="/chat-pic" className="chat-pic" />
            </div>
            <div className="chat-details">
                <span className="chat-name">{name}</span>
            </div>
        </li>
    );
}

function ChatBoxContainer({ setShowChatting }) {
    const dispatch = useDispatch();
    const userChatData = useSelector(
        (state: RootState) => state.userChat.chats[state.userChat.index]
    );

    // const userData = useSelector((state: RootState) => state.user);
    // const otherUserId = userChatData.users.find(
    //     (data) => data.userId != userData.email
    // );
    const chatBoxRef = useRef(null);

    function scrollToBottom(elementRef: React.RefObject<HTMLDivElement>) {
        if (elementRef.current) {
            elementRef.current.scrollTop = elementRef.current.scrollHeight;
        }
    }

    useEffect(() => {
        scrollToBottom(chatBoxRef);
    }, [userChatData]);

    function handleInputChatSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const inputBox = (e.target as HTMLElement).querySelector(
            'input[type="text"]'
        ) as HTMLInputElement;
        dispatch({ type: "userChat/sendMessage", payload: inputBox.value });
        inputBox.value = "";
    }

    return (
        <>
            <div className="chat-box-container">
                <div className="chat-box">
                    <header className="chat-header">
                        <span
                            className="material-symbols-outlined close-menu-btn"
                            onClick={() => setShowChatting(false)}
                        >
                            keyboard_backspace
                        </span>
                        <div className="chat-pic-container">
                            <img
                                src={profilePic}
                                alt="pic"
                                className="chat-pic"
                            />
                        </div>
                        <h1 className="chat-name">name</h1>
                        <div className="calling-buttons">
                            <button className="btn video-call-btn">
                                <span className="material-symbols-outlined callicon">
                                    videocam
                                </span>
                            </button>
                            <button className="btn audio-call-btn">
                                <span className="material-symbols-outlined callicon">
                                    call
                                </span>
                            </button>
                        </div>
                    </header>

                    <ul className="message-list" ref={chatBoxRef}>
                        {/* <MessageItem isMyMessage={true}>
                            Hi,How are you?
                        </MessageItem>
                        <FileMessageItem src={sampleImg} />
                    <FileMessageItem isMyMessage={true} src={sampleImg} /> */}
                        {/* 
                            {userChatData.index != -1 &&
                                userChatData.chats[
                                    userChatData.index
                                ].messages?.map((message) => {
                                    console.log(message);
                                    return "hi";
                                })} */}
                        {userChatData.messages.map((m) => {
                            return (
                                <MessageItem isMyMessage={m.own} key={m.id}>
                                    {m.message}
                                </MessageItem>
                            );
                        })}
                    </ul>
                </div>
                <form
                    className="sendMessageContainer"
                    onSubmit={handleInputChatSubmit}
                >
                    <div className="message-input-group">
                        <input type="text" className="messageInput" />
                    </div>
                    <button type="submit" className="send-button">
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </form>
            </div>
        </>
    );
}
