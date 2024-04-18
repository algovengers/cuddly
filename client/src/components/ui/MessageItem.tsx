
export default function MessageItem({isMyMessage=false,children=""}) {
  return (
    <li className={`message-item ${isMyMessage?"my-message":""}`}>{children}</li>
  )
}
