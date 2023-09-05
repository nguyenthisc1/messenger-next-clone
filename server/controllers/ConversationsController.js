import { checkUser } from '../models/UsersModel.js'
import { createOrGetConversationById, deleteConversationById, getConversationById, getConversationExisiting, getConversationsListByCurrentUserId } from '../models/ConversationsModel.js'
import getPrismaInstance from '../utils/Prismaclient.js'
import pusherClient from '../utils/Pusherclient.js'

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

        if (isGroup && (!members || members.length < 1 || !name)) {
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

        const newConversation = await createOrGetConversationById({ userId }, currentUser)

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

export const deleteConversationAction = async (request, response) => {
    try {

        const { id: conversationId } = request.params
        const { email } = request.query

        if (!email) {
            return response.status(422).json({ message: "Email not found!" })
        }

        const currentUser = await checkUser(email)


        if (!conversationId) {
            return response.status(422).json({ message: "conversation id not found!" })
        }

        const existingConversation = await getConversationById(conversationId)

        if (!existingConversation) {
            return response.status(422).json({ message: "Invalid data" })
        }

        const deleteConversation = await deleteConversationById(conversationId, currentUser)

        existingConversation.users.forEach((user) => {
            if (user.email) {
                pusherClient.trigger(user.email, 'conversation:remove', existingConversation);
            }
        });

        return response.status(200).json(deleteConversation)
    } catch (error) {
        console.log(error, "DELETE_CONVERSATIONS_ERROR");
        response.status(500).json(error);
    }

}

export const seenConversationAction = async (request, response) => {
    const prisma = getPrismaInstance();

    try {
        const { email } = request.query
        const { id: conversationId } = request.params

        const currentUser = await checkUser(email)

        if (!currentUser?.email || !currentUser?.id) {
            return response.status(401).json({ message: "Unauthorized" })
        }

        if (!conversationId) {
            return response.status(404).json({ message: "conversation Id not found!" })
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    },
                },
                users: true,
            },
        });

        if (!conversation) {
            return response.status(404).json({ message: "Invalid Data" })
        }

        // find last message
        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if (!lastMessage) {
            return response.status(200).json({ data: conversation })
        }

        // Update seen of last message
        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true,
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        // Update all connections with new seen
        await pusherClient.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage]
        });

        // If user has already seen the message, no need to go further
        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return response.status(200).json(conversation);
        }

        // Update last message seen
        await pusherClient.trigger(conversationId, 'message:update', updatedMessage);

        return response.status(200).json(true)
    } catch (error) {
        console.log(error, "SEEN_CONVERSATIONS_ERROR");
        response.status(500).json(error);
    }
}