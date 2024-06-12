export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: "admin" | "user"
}