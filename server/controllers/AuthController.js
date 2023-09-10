import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkUser, getFullProfile, updateProfile } from "../models/UsersModel.js";
import getPrismaInstace from "../utils/Prismaclient.js";
import pusherClient from "../utils/Pusherclient.js";

export const loginAction = async (request, response) => {
    try {
        const { email, password } = request.body;

        const user = await checkUser(email);
        if (!user) {
            return response
                .status(422)
                .json({ message: "Email or Password is not correct" });
        }

        const checkPassword = await bcrypt.compare(
            password,
            user.hashedPassword
        );

        if (!checkPassword)
            return responses
                .status(422)
                .json({ message: "Email or Password is not correct" });

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24,
        });

        return response
            .status(200)
            .header("token", token)
            .json({ ...user, token });
    } catch (error) {
        console.log(error, "LOGIN_ERROR");
        response.status(500).json(error);
    }
};

export const registerAction = async (request, response) => {
    try {
        const prisma = getPrismaInstace();
        const { email, name, password } = request.body;

        if (!email || !name || !password) {
            return response.status(400).json({ message: "Missing info" });
        }

        const checkEmailExis = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (checkEmailExis) {
            return response.status(422).json({ message: "Email is exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        return response.status(200).json(newUser);
    } catch (error) {
        console.log(error, "REGISTRATION_ERROR");
        response.status(500).json(error);
    }
};

export const getProfileAction = async (request, response) => {
    try {
        const { email } = request.query;

        if (!email) {
            return response.status(422).json({ message: "Email not found!" });
        }

        const user = await getFullProfile(email);

        if (!user) {
            return res
                .status(422)
                .json({ message: "User not found!" });
        }

        return response.status(200).json(user);
    } catch (error) {
        console.log(error, "GET_PROFILE_ERROR");
        response.status(500).json(error);
    }
};

export const updateProfileAction = async (request, response) => {
    try {
        const { email, name, image } = request.body

        if (!email) {
            return response.status(400).json({ message: "Invalid Data" });
        }

        const currentUser = await checkUser(email)

        const updatedprofile = await updateProfile({ currentUser, name, image })

        return response.status(200).json({ data: updatedprofile })

    } catch (error) {
        console.log(error, "UPDATE_PROFILE_ERROR");
        response.status(500).json(error);
    }
}

export const pusherAuthChannel = async (request, response) => {
    try {
        const { socket_id, channel_name, user_id } = request.body
        const socketId = socket_id
        const channel = channel_name
        const presenceData = { user_id };
        const authResponse = pusherClient.authorizeChannel(socketId, channel, presenceData);
        return response.status(200).json(authResponse);
    } catch (error) {
        console.log('AUTH_PUSHER_ERROR', error);
        return response.status(500).json(error)
    }
}