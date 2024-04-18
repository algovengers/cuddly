import { useDispatch, useSelector } from "react-redux";
import profilePic from "../../assets/home4.png";
import sampleImg from "../../assets/main.jpeg";
import FileMessageItem from "./FileMessageItem";
import MessageItem from "./MessageItem";
import { RootState } from "@/redux/store";
import { adduserChatMessage, changeIndex } from "@/redux/userChatSlice";

export default function ChatBox() {
    const userChatData = useSelector((state: RootState) => state.userChat);
    const userData = useSelector((state: RootState) => state.user);

    return (
        <div className="user-chats">
            <div className="chat-list">
                <h1 className="chatListHeading">Chats</h1>
                <ul className="chats">
                    {userChatData?.chats?.map(({ id, users }, i) => {
                        const data = users.find(
                            (data) => data.userId != userData.email
                        );

                        return (
                            <SidechatViewer
                                name={data.name}
                                key={id}
                                index={i}
                            />
                        );
                    })}
                </ul>
            </div>
            {userChatData.index != -1 && <ChatBoxContainer />}
        </div>
    );
}

function SidechatViewer({ name, index }) {
    const dispatch = useDispatch();
    return (
        <li
            className="chat-item"
            onClick={() => {
                dispatch(changeIndex({ index }));
            }}
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

function ChatBoxContainer() {
    const dispatch = useDispatch();
    const userChatData = useSelector(
        (state: RootState) => state.userChat.chats[state.userChat.index]
    );

    const userData = useSelector((state: RootState) => state.user);
    const otherUserId = userChatData.users.find(
        (data) => data.userId != userData.email
    );

    function handleInputChatSubmit(e: Event) {
        e.preventDefault();
        const inputBox = (e.target as HTMLElement).querySelector(
            'input[type="text"]'
        );
        dispatch({ type: "userChat/sendMessage", payload: inputBox.value });
        inputBox.value = "";
    }

    return (
        <>
            <div className="chat-box-container">
                <div className="chat-box">
                    <header className="chat-header">
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
                    <ul className="message-list">
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
                        <label htmlFor="file" className="file-input-label">
                            <span className="material-symbols-outlined ">
                                attach_file
                            </span>
                        </label>
                        <input
                            type="file"
                            name="file"
                            id="file"
                            className="imageInput"
                        />
                    </div>
                    <button type="submit" className="send-button">
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </form>
            </div>
        </>
    );
}
