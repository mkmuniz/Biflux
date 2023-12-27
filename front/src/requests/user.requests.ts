import { get } from "http";
import { post } from "./request.config";

export async function login(body: any) {
    try {
        const data = await post('/login', body); 

        return data;
    } catch (err: any) {
        console.error(err);
    };
};

export async function signUp(body: any) {
    try {
        const data: any = await post('/user', body);

        return { ...data };
    } catch (err: any) {
        console.error(err);
    };
};

export async function getUserByEmail(email: string) {
    try {
        const data = await get('/user', )
    } catch (err) {
        console.error(err);
    }
};