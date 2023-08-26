import { getMessagesByConversationId } from "../models/MessagesModel.js";

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
