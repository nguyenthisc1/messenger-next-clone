import getPrismaInstace from "../utils/Prismaclient.js";
export const getMessagesByConversationId = async (conversationId) => {
  const prisma = getPrismaInstace();

  const getMessages = await prisma.message.findMany({
    where: {
      conversationId,
    },
    include: {
      sender: true,
      seen: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return getMessages
};

export const postMessages = async (body) => {
  const prisma = getPrismaInstace();

  const newMessages = await prisma.message.create({
    include: {
      seen: true,
      sender: true
    },
    data: {
      body: body.message,
      image: body.image,
      conversation: {
        connect: { id: body.conversationId }
      },
      sender: {
        connect: { id: body.currentUser.id }
      },
      seen: {
        connect: {
          id: body.currentUser.id
        }
      },
    }
  })

  return newMessages
}

