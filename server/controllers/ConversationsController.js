import { checkUser } from '../models/UsersModel.js'
import { createConversation, getConversationByUserId, getConversationsList } from '../models/ConversationsModel.js'

// get one 
export const getConversation = async (request, response) => {
    
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
            return response.status(400).json({message: 'Invalid data'})
        }

        if (isGroup) {
            const newConversation = await createConversation({ isGroup, members, name },currentUser)

            return response.status(200).json({data: newConversation})
        }

        const exisitingConversation = await getConversationByUserId(currentUser, userId)

        const singleConversation = exisitingConversation[0]

        if (singleConversation) {
            return response.status(200).json({data: singleConversation})
        }

        const newConversation = await createConversation({ userId },currentUser)
        
        return response.status(200).json({data: newConversation})

    } catch (error) {
        console.log(error, "GETCONVERSATION_ERROR");
        response.status(500).json(error);
    }
}

// get list
export const getConversations = async (request, response) => {
    try {
        const { email } = request.query

        if (!email) {
            return response.status(422).json({ message: "Email not found!" })
        }

        const currentUser = await checkUser(email)

        const conversations = await getConversationsList(currentUser)

        response.status(200).json({ data: conversations })

    } catch (error) {
        console.log(error, "GETCONVERSATIONS_ERROR");
        response.status(500).json(error);
    }
}