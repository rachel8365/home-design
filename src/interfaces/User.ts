export default interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    password: string;
    email: string;
    city?: string;
    street?: string;
    houseNumber?: number;
    isAdmin?: boolean;
    favorites?: any[];
}

export interface DecodedToken {
    email: string
    isAdmin?: boolean;
    _id: string
}