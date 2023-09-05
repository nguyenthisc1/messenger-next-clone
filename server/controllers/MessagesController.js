import { updateConversation } from "../models/ConversationsModel.js";
import { getMessagesByConversationId, postMessages } from "../models/MessagesModel.js";
import { checkUser } from "../models/UsersModel.js";
import pusherClient from '../utils/Pusherclient.js'


export const getMessagesAction = async (request, response) => {
  try {
    const { id: conversationId } = request.params;

    if (!conversationId) {
      return response
        .status(422)
        .json({ message: "conversation Id not found!" });
    }

    const messages = await getMessagesByConversationId(conversationId);

    return response.status(200).json({ data: messages });
  } catch (error) {
    console.log(error, "GET_MESSAGES_ERROR");
    response.status(500).json(error);
  }
};


export const postMessagesAction = async (request, response) => {
  try {
    const { message, image, conversationId, email } = request.body

    const currentUser = await checkUser(email)

    if (!currentUser?.email || !currentUser?.id) {
      return response.status(401).json({ message: "Unauthorized" })
    }

    if (!conversationId) {
      return response.status(404).json({ message: "conversation Id not found!" })
    }

    const newMessage = await postMessages({ message, image, conversationId, currentUser })

    const updatedConversation = await updateConversation({ conversationId, newMessage })

    await pusherClient.trigger(conversationId, 'messages:new', newMessage)

    const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1]

    updatedConversation.users.map((user) => {
      pusherClient.trigger(user.email, 'conversation:update', {
        id: conversationId,
        messages: [lastMessage]
      });
    });

    return response.status(200).json({ data: newMessage });

  } catch (error) {
    console.log(error, "POST_MESSAGES_ERROR");
    response.status(500).json(error);
  }
}