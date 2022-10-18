import {setDirectChatHistory} from '../stores/actions/meet.action.type';
import {store} from '../../App';
//import { useDispatch, useSelector } from "react-redux";
//import { RootState } from "../stores/reducers";

export const appendNewMessageToChatHistory = (data: any) => {
  const {isAuthor, receiverSocketId, authorSocketId} = data;

  if (isAuthor) {
    appendMessageToChatHistory(receiverSocketId, data);
  } else {
    appendMessageToChatHistory(authorSocketId, data);
  }
};

const appendMessageToChatHistory = (userSocketId: any, data: any) => {
  const chatHistory: any = [...store.getState().meet.directChatHistory];
  const userChatHistory = chatHistory.find(
    (h: any) => h.socketId === userSocketId,
  );

  if (userChatHistory) {
    const newDirectMessage = {
      isAuthor: data.isAuthor,
      messageContent: data.messageContent,
      identity: data.identity,
    };

    const newUserChatHistory = {
      ...userChatHistory,
      chatHistory: [...userChatHistory.chatHistory, newDirectMessage],
    };

    const newChatHistory = [
      ...chatHistory.filter((h: any) => h.socketId !== userSocketId),
      newUserChatHistory,
    ];
    store.dispatch(setDirectChatHistory(newChatHistory));
  } else {
    const newUserChatHistory = {
      socketId: userSocketId,
      chatHistory: [
        {
          isAuthor: data.isAuthor,
          messageContent: data.messageContent,
          identity: data.identity,
        },
      ],
    };
    const newChatHistory = [...chatHistory, newUserChatHistory];
    store.dispatch(setDirectChatHistory(newChatHistory));
  }
};
