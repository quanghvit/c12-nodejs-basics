export interface IUser {
    user_id: string;
    email: string;
    name: string;
    given_name: string;
    family_name: string;
    nickname: string;
    last_ip?: string | null;
    logins_count: number;
    created_at: string;
    updated_at?: string | null;
    last_login: string | null;
    email_verified: boolean;
}
