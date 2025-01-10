import { get, patch, post } from "./request.config";

export async function login(body: any) {
    const data = await post('login', body);

    return data;
};

export async function signUp(body: any) {
    const data: any = await post('user', body);

    return { ...data };
};

export async function getUserById(id: string) {
    const data = await get(`user/${id}`);

    return data;
};

export async function getUserByEmail(email: string) {
    const data = await post('user', { email })

    return data;
};

export async function updateUserProfile(id: string, body: any) {
    const data = await patch(`user/profile/${id}`, body);

    return data;
};

export async function getRefreshToken(body: any) {
    const data = await post('refreshtoken', body);

    return data;
};

export async function fetchUserProfile(id: string) {
    const data = await get(`user/profile/${id}`);

    return data;
};