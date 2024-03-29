import { getUsersNotCurrentUser } from "../models/UsersModel.js";

export const getUsersAction = async (request, response) => {
    try {
        const { email } = request.query;


        // if (!email) {
        //     return res.status(422).json({ message: "User not found!" });
        // }

        const users = await getUsersNotCurrentUser(email);

        return response.status(200).json({data: users});
    } catch (error) {
        console.log(error, "GET_USERS_ERROR");
        response.status(500).json(error);
    }
};
