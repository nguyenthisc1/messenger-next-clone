import bodyParser from 'body-parser';
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import passport from "passport";
import AuthRoutes from "./routes/AuthRoutes.js";
import ConversationsRoutes from './routes/ConversationsRoutes.js';
import MessagesRoutes from './routes/MessagesRoutes.js';
import UserRoutes from "./routes/UsersRoutes.js";
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express();

var MemoryStore = session.MemoryStore;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser())
app.use(
    session({
        name: 'app.sid',
        secret: "1234567890QWERTY",
        resave: true,
        store: new MemoryStore(),
        saveUninitialized: true
    })
);
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/conversations", ConversationsRoutes)
app.use("/api/messages", MessagesRoutes)

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server Started on port ${process.env.PORT}`);
});






