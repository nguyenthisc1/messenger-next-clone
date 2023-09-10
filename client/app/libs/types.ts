interface LoginRequest {
    email: string;
    password: string;
    name?: string;
}

interface LoginResponse {
    id: string;
    name: string;
    email: string;
    emailVerified: any;
    image: any;
    hashedPassword: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    conversationIds: any[];
    seenMessageIds: any[];
}

interface FullProfile {
    id?: string;
    pusherSessionId?: string
    name?: string;
    email?: string;
    image?: string;
    emailVerified?: string;
    status?: number;
    createdAt?: string;
    updatedAt?: string;
    conversationIds?: any[];
    seenMessageIds?: any[];
}

interface RegisterResponse {
    id: string;
    name: string;
    email: string;
    emailVerified: any;
    image: any;
    hashedPassword: string;
    token: any;
    createdAt: string;
    updatedAt: string;
    conversationIds: any[];
    seenMessageIds: any[];
}

interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

interface UpdateProfileResponse {
    data: FullProfile
}

interface UpdateProfileResquest {
    email?: string
    name?: string
    image?: string
}

interface GetUserResponse {
    data: Array<UserItem>;
}

interface UserItem {
    id?: string;
    pusherSessionId?: string;
    name?: string;
    email?: string;
    image?: any;
    emailVerified?: any;
    conversationIds?: any[];
    seenMessageIds?: any[];
}

interface GetUserRequest {
    email: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    image: any;
    emailVerified: any;
    conversationIds: any[];
    seenMessageIds: any[];
}

interface ConversationResponse {
    id: string;
    createdAt: string;
    lastMessageAt: string;
    name: string;
    isGroup: boolean;
    messagesIds: string[];
    userIds: string[];
    users: FullProfile[];
}

interface ConversationRequest {
    email: string;
    userId?: string;
    isGroup?: boolean;
    members?: string[];
    name?: string;
}


interface ConversationsResponse {
    data: Array<ConversationItem>
}

interface ConversationResponse {
    data: ConversationItem
}


interface ConversationItem {
    id: string
    createdAt: string
    lastMessageAt: string
    name: any
    isGroup: any
    messagesIds: any[]
    userIds: string[]
    users: User[]
    messages: any[]
}


interface MessagesResponse {
    data: any
}

interface Message {
    id: string
    body: string
    image: string
    createdAt: string
    seenIds: string[]
    seen: User[]
    conversationId: string
    senderId: any
    sender: any

}

type FullMessageType = Message & {
    sender: User,
    seen: User[]
};

type FullConversationType = ConversationItem & {
    users: User[];
    messages: FullMessageType[]
};

interface SeenConversationResponse {
    data: ConversationItem
}

interface SeenConversationRequest {
    email?: string,
    conversationId?: string
}

interface MessageItem {
    userId: number
    id: string
    body: string
    image: any
    createdAt: string
    seenIds: string[]
    conversationId: string
    senderId: string
    seen: Seen[]
    sender: Sender
}

interface Seen {
    id: string
    name: string
    email: string
    emailVerified: any
    image: any
    hashedPassword: string
    createdAt: string
    updatedAt: string
    conversationIds: string[]
    seenMessageIds: string[]
}

interface Sender {
    id: string
    name: string
    email: string
    emailVerified: any
    image: any
    hashedPassword: string
    createdAt: string
    updatedAt: string
    conversationIds: string[]
    seenMessageIds: string[]
}

interface PostMessageResponse {
    data: MessageItem
}

interface PostMessageRequest {
    email?: string,
    message?: string,
    image?: string
    conversationId?: string
}

