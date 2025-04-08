// User-related interfaces
interface UserLinks {
    website?: string;
    youtube?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    spotify?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
}

interface User {
    id: string;
    name: string;
    username: string;
    img: string;
    phoneNumber: string;
    email: string;
    bio: string;
    followers: number;
    following: number;
    posts: number;
    likes: number;
    verified: boolean;
    subscribers: number;
    links: UserLinks;
    location: string;
    joinDate: string;
    occupation: string;
    interests: string[];
}

// Message-related interfaces
interface Message {
    id: string;
    userId: string;
    content: string;
    date: string;
    read: boolean;
    unreadCount: number;
}

// Data structure interfaces
interface UsersData {
    users: User[];
}

interface MessagesData {
    messages: Message[];
}

// Combined chat interface (for display purposes)
interface ChatMessage extends Message {
    user?: {
        name: string;
        username: string;
        img: string;
        verified: boolean;
    };
}

// Chat user interface (simplified user for chat display)
interface ChatUser {
    id: string;
    name: string;
    username: string;
    img: string;
    phoneNumber: string;
    verified: boolean;
    lastMessage?: {
        content: string;
        date: string;
        read: boolean;
        unreadCount: number;
    };
}

export type {
    User,
    UserLinks,
    Message,
    UsersData,
    MessagesData,
    ChatMessage,
    ChatUser
};