export type LoginData = {
    email: string
    password: string
}

export type UserInfo = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export type ManageUser = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserInfo[];
    support: {
        url: string;
        text: string;
    };
}

export type AuthToken = { token?: string } 