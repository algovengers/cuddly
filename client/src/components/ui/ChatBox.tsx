import profilePic from '../../assets/home4.png'
import sampleImg from '../../assets/main.jpeg';
import FileMessageItem from './FileMessageItem';
import MessageItem from './MessageItem';

export default function ChatBox() {
  return (
    <div className="user-chats">
            <div className="chat-list">
                <h1 className="chatListHeading">Chats</h1>
                <ul className="chats">
                    <li className="chat-item">
                        <div className="chat-pic-container">
                            <img src={profilePic} alt="/chat-pic" className="chat-pic" />
                        </div>
                        <div className="chat-details">
                            <span className="chat-name">Smith Williams</span>
                            <span className="last-chat">How are you?</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="chat-box-container">
                <div className="chat-box">
                    <header className="chat-header">
                        <div className="chat-pic-container">
                            <img src={profilePic} alt="pic" className="chat-pic" />
                        </div>
                        <h1 className="chat-name">Smith Williams</h1>
                        <div className="calling-buttons">
                            <button className="btn video-call-btn"><span className="material-symbols-outlined callicon">videocam</span></button>
                            <button className="btn audio-call-btn"><span className="material-symbols-outlined callicon">call</span></button>
                        </div>
                    </header>
                    <ul className="message-list">
                        
                        <MessageItem isMyMessage={true}>Hi,How are you?</MessageItem>
                        <MessageItem>I'm fine</MessageItem>
                        <MessageItem isMyMessage={true}>I'm interseted in adopting you dog?</MessageItem>
                        <MessageItem>that's Lorem ipsum dolor sit amet consectetur Lorem lorem100 ipsum dolor sit amet consectetur adipisicing elit. Facilis, excepturi accusamus quis dolorum magnam, nam maxime eos fugit officia aperiam deleniti officiis, architecto alias dolorem totam minima vero. Illo delectus asperiores repudiandae vel, eaque quod? adipisicing elit. Vel perferendis commodi doloribus quas at culpa provident fuga et cupiditate aliquid? great</MessageItem>
                        <MessageItem>let's meet</MessageItem>
                        <FileMessageItem src={sampleImg} isMyMessage={true}/>
                        <FileMessageItem src={sampleImg}/>
                    </ul>
                </div>
                <form className="sendMessageContainer">
                    <div className="message-input-group">

                    <input type="text" className="messageInput" />
                    <label htmlFor="file" className='file-input-label'>
                    <span className="material-symbols-outlined ">attach_file</span>
                    </label>
                    <input type="file" name="file" id="file" className='imageInput' />
                    </div>
                    <button type="submit" className='send-button'><span className="material-symbols-outlined">send</span></button>
                </form>
            </div>
            
        </div>
  )
}
