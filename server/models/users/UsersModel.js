import getPrismaInstace from "../../utils/Prismaclient.js";

export const checkUser = async (email) => {
    const prisma = getPrismaInstace();
    const user = await prisma.user.findUnique({
        where: { email },
    });

    return user;
};

export const getUsersModel = async (currentUser) => {
    const prisma = getPrismaInstace();

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
            conversationIds: true,
            seenMessageIds: true,
        },
        orderBy: {
            createdAt: "desc",
        },

        where: {
            NOT: {
                email: currentUser ? currentUser : null,
            },
        },
    });
    return users;

    // if (currentUser) {
    //     const users = await prisma.user.findMany({
    //         select: {
    //             id: true,
    //             name: true,
    //             email: true,
    //             image: true,
    //             emailVerified: true,
    //             conversationIds: true,
    //             seenMessageIds: true,
    //         },
    //         orderBy: {
    //             createdAt: "desc",
    //         },

    //         where: {
    //             NOT: {
    //                 email: currentUser,
    //             },
    //         },
    //     });
    //     return users;
    // } else {
    //     const users = await prisma.user.findMany({
    //         select: {
    //             id: true,
    //             name: true,
    //             email: true,
    //             image: true,
    //             emailVerified: true,
    //             conversationIds: true,
    //             seenMessageIds: true,
    //         },
    //         orderBy: {
    //             createdAt: "desc",
    //         },
    //     });
    //     return users;
    // }
};

export const getFullProfileModel = async (email) => {
    const prisma = getPrismaInstace();
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            emailVerified: true,
            createdAt: true,
            updatedAt: true,
            conversationIds: true,
            seenMessageIds: true,
        },
    });

    return user;
};
