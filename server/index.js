import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import AuthRoutes from "./routes/AuthRoutes.js";
import UserRoutes from "./routes/UsersRoutes.js";
import ConversationRoutes from './routes/ConversationsRoutes.js'
import MessagesRoutes from './routes/MessagesRoutes.js'
import passport from "passport";
import session from "express-session";

dotenv.config();
const app = express();
app.use(
    session({
        secret: "somesecret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/conversations", ConversationRoutes)
app.use("/api/messages", MessagesRoutes)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
});
