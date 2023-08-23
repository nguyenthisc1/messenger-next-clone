import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { checkUser, getFullProfileModel } from "../models/users/UsersModel.js";
import getPrismaInstace from "../utils/Prismaclient.js";

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await checkUser(email);
        if (!user) {
            return res
                .status(422)
                .json({ message: "Email or Password is not correct" });
        }

        const checkPassword = await bcrypt.compare(
            password,
            user.hashedPassword
        );

        if (!checkPassword)
            return res
                .status(422)
                .json({ message: "Email or Password is not correct" });

        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: 60 * 60 * 24,
        });

        req.session.user = user.email;
        return res
            .status(200)
            .header("token", token)
            .json({ ...user, token });
    } catch (error) {
        console.log(error, "LOGIN_ERROR");
        res.status(500).json(error);
    }
};

export const registerController = async (req, res) => {
    try {
        const prisma = getPrismaInstace();
        const { email, name, password } = req.body;

        if (!email || !name || !password) {
            return res.status(400).json({ message: "Missing info" });
        }

        const checkEmailExis = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (checkEmailExis) {
            return res.status(422).json({ message: "Email is exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword,
            },
        });

        return res.status(200).json(newUser);
    } catch (error) {
        console.log(error, "REGISTRATION_ERROR");
        res.status(500).json(error);
    }
};

export const getProfileController = async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(422).json({ message: "Email not found!" });
        }

        const user = await getFullProfileModel(email);
  
        if (!user) {
            return res
                .status(422)
                .json({ message: "User not found!" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log(error, "GETPROFILE_ERROR");
        res.status(500).json(error);
    }
};
