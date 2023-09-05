import getPrismaInstace from "../utils/Prismaclient.js";

export const getConversationExisiting = async (currentUser, userId) => {
  const prisma = getPrismaInstace();

  const getConversation = await prisma.conversation.findMany({
    where: {
      OR: [
        {
          userIds: {
            equals: [currentUser.id, userId],
          },
        },
        {
          userIds: {
            equals: [userId, currentUser.id],
          },
        },
      ],
    },
  });

  return getConversation;
};

export const createOrGetConversationById = async (body, currentUser) => {
  const prisma = getPrismaInstace();

  if (body.isGroup) {
    const newGroupConversation = await prisma.conversation.create({
      data: {
        name: body.name,
        isGroup: body.isGroup,
        users: {
          connect: [
            ...body.members.map((member) => ({
              id: member.value,
            })),
            {
              id: currentUser.id,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    return newGroupConversation;
  } else {
    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id,
            },
            {
              id: body.userId,
            },
          ],
        },
      },
      include: {
        users: true,
      },
    });
    return newConversation;
  }
};

export const getConversationsListByCurrentUserId = async (currentUser) => {
  const prisma = getPrismaInstace();

  const getConversations = await prisma.conversation.findMany({
    orderBy: {
      lastMessageAt: "desc",
    },
    where: {
      userIds: {
        has: currentUser.id,
      },
    },
    include: {
      users: true,
      messages: {
        include: {
          sender: true,
          seen: true,
        },
      },
    },
  });

  return getConversations;
};

export const getConversationById = async (conversationId) => {
  const prisma = getPrismaInstace();

  const getConversation = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    include: {
      users: true,
    },
  });

  return getConversation;
};

export const deleteConversationById = async (conversationId, currentUser) => {
  const prisma = getPrismaInstace();

  const deleteConversation = await prisma.conversation.deleteMany({
    where: {
      id: conversationId,
      userIds: {
        hasSome: [currentUser.id]
      },
    },
  })

  return deleteConversation
}

export const updateConversation = async (body) => {
  const prisma = getPrismaInstace();

  const updatedConversation = await prisma.conversation.update({
    where: {
      id: body.conversationId
    },
    data: {
      lastMessageAt: new Date(),
      messages: {
        connect: {
          id: body.newMessage.id
        }
      }
    },
    include: {
      users: true,
      messages: {
        include: {
          seen: true
        }
      }
    }
  });

  return updatedConversation
}