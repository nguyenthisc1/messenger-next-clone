import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import path from 'path';
import AuthRoutes from "./routes/AuthRoutes.js";
import ConversationsRoutes from './routes/ConversationsRoutes.js';
import MessagesRoutes from './routes/MessagesRoutes.js';
import UserRoutes from "./routes/UsersRoutes.js";


dotenv.config();
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(express.static(path.join(__dirname, '/../public')));
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
app.use("/api/conversations", ConversationsRoutes)
app.use("/api/messages", MessagesRoutes)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
});





