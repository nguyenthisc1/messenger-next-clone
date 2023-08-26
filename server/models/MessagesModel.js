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
