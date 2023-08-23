import { getUsersModel } from "../models/users/UsersModel.js";

export const getUsersController = async (req, res) => {
    try {
        const { email } = req.query;


        // if (!email) {
        //     return res.status(422).json({ message: "User not found!" });
        // }

        const users = await getUsersModel(email);

        return res.status(200).json({data: users});
    } catch (error) {
        console.log(error, "GETUSERS_ERROR");
        res.status(500).json(error);
    }
};
