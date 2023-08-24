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
    id: number;
    name: string;
    email: string;
    image: string;
    emailVerified: string;
    status?: number;
    createdAt: string;
    updatedAt: string;
    conversationIds: any[];
    seenMessageIds: any[];
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

interface GetUserResponse {
    data: Array<UserItem>;
}

interface UserItem {
    id?: string;
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

interface ConversationRequest {
    id: string;
    createdAt: string;
    lastMessageAt: string;
    name: string;
    isGroup: boolean;
    messagesIds: string[];
    userIds: string[];
    users: FullProfile[];
}

interface ConversationResponse {
    email: string;
    userId: string;
    isGroup?: boolean;
    members?: string[];
    name?: string;
}


interface ConversationsRequest {
    data: Array<conversationItem>
}


interface conversationItem {
    id: string
    createdAt: string
    lastMessageAt: string
    name: any
    isGroup: any
    messagesIds: any[]
    userIds: string[]
    users: FullProfile[]
    messages: any[]
}
