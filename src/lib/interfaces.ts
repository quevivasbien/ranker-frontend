export interface Item {
    name: string;
    description: string;
}

export interface User {
    name: string;
}

export interface UserScore {
    itemName: string;
    userName: string;
    rating: number;
    numVotes: number;
}

export interface GlobalScore {
    itemName: string;
    rating: number;
    numVotes: number;
}

export interface SessionInfo {
    username: string;
    token: string;
}