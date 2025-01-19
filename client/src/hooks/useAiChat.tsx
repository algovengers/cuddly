import { setAnimation } from "@/redux/animationSlice";
import { addAichat, addHumanChat } from "@/redux/chatSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
export default function useAiChat() {
  const dispatch = useDispatch();
  return {
    async addMessage(message, cb?: () => void) {
      dispatch(setAnimation(true));
      dispatch(addHumanChat({ own: true, message }));
      cb();

      const response = await axios.post(import.meta.env.VITE_CHAT_PATH, {
        chat: message,
      });
      const ans = response.data.result;
      dispatch(setAnimation(false));
      dispatch(addAichat({ own: false, message: ans }));
    },
    setAnimation,
  };
}
