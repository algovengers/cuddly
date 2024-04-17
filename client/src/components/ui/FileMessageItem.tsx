
export default function FileMessageItem({src="",isMyMessage=false}) {
  return (
    <li className={`message-item ${isMyMessage?"my-message":""} chat-file`}>
        <img src={src} alt="chat-img" className='chat-image'/>
    </li>
  )
}
