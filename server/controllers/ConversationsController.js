import { checkUser } from '../models/UsersModel.js'
import { createOrGetConversationById, getConversationById, getConversationExisiting, getConversationsListByCurrentUserId } from '../models/ConversationsModel.js'

// get one 
export const createOrGetConversationAction = async (request, response) => {

    try {
        const { email, userId, isGroup, members, name } = request.body

        if (!email) {
            return response.status(422).json({ message: "Email not found!" })
        }
        const currentUser = await checkUser(email)

        if (!currentUser?.email || !currentUser?.id) {
            return response.status(401).json({ message: "Unauthorized" })
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return response.status(400).json({ message: 'Invalid data' })
        }

        if (isGroup) {
            const newConversation = await createOrGetConversationById({ isGroup, members, name }, currentUser)

            return response.status(200).json({ data: newConversation })
        }

        const exisitingConversation = await getConversationExisiting(currentUser, userId)

        const singleConversation = exisitingConversation[0]

        if (singleConversation) {
            return response.status(200).json({ data: singleConversation })
        }

        const newConversation = await createConversation({ userId }, currentUser)

        return response.status(200).json({ data: newConversation })

    } catch (error) {
        console.log(error, "GET_CONVERSATION_ERROR");
        response.status(500).json(error);
    }
}

// get list
export const getConversationsAction = async (request, response) => {
    try {
        const { email } = request.query

        if (!email) {
            return response.status(422).json({ message: "Email not found!" })
        }

        const currentUser = await checkUser(email)

        const conversations = await getConversationsListByCurrentUserId(currentUser)

        response.status(200).json({ data: conversations })

    } catch (error) {
        console.log(error, "GET_CONVERSATIONS_ERROR");
        response.status(500).json(error);
    }
}

export const getConversationByIdAction = async (request, response) => {
    try {
        const { id: conversationId } = request.params

        if (!conversationId) {
            return response.status(422).json({ message: "conversation Id not found!" })
        }

        const conversation = await getConversationById(conversationId)

        response.status(200).json({ data: conversation })

    } catch (error) {
        console.log(error, "GET_CONVERSATION_BY_ID_ERROR");
        response.status(500).json(error);
    }
}