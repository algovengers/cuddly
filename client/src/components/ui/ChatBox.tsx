import profilePic from '../../assets/home4.png'
import sampleImg from '../../assets/main.jpeg';


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
                        
                        <li className="message-item ">I'm fine.</li>
                        <li className="message-item my-message">I'm interseted in adoption you dog?</li>
                        <li className="message-item ">that's great</li>
                        <li className="message-item ">let's meet</li>
                        <li className="message-item my-message">Hi, how are you?</li>
                        <li className="message-item ">hello Lorem ipsum olor sit, amet consectetur adipisicing elit. Est quas nemo rem provident ex quaerat nisi reiciendis modi eaque commodi.</li>
                        <li className="message-item ">I'm fine.</li>
                        <li className="message-item my-message">I'm interseted in adoption you dog?</li>
                        <li className="message-item ">that's great</li>
                        <li className="message-item ">let's meet</li>
                        <li className='message-item my-message chat-file'>
                            <img src={sampleImg} alt="chat-img" className='chat-image'/>
                        </li>
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
                    </header>
                    <ul className="message-list">
                    <li className="message-item user-message">Hi, how are you?</li>
                    <li className="message-item user">hello</li>
                    <li className="message-item user">I'm fine.</li>
                    <li className="message-item user-message">I'm interseted in adoption you dog?</li>
                    <li className="message-item user">that's great</li>
                    <li className="message-item user">let's meet</li>


                    </ul>
                </div>
                <form className="sendMessageContainer">
                    <input type="text" className="messageInput" />
                    <button type="submit" className='send-button'><span className="material-symbols-outlined">send</span></button>
                </form>
            </div>
            
        </div>
  )
}
