import { LoginDataForm, SignUpDataForm, ProfileDataForm } from "@/types/forms.types";
import { get, patch, post } from "./request.config";

export async function login(body: LoginDataForm) {
    return post('login', body);
};

export async function signUp(body: SignUpDataForm) {
    return post('user', body);
};

export async function updateUserProfile(id: string, body: ProfileDataForm) {
    return patch(`user/profile/${id}`, body);
};

export async function getRefreshToken(body: any) {
    return post('refreshtoken', body);
};

export async function fetchUserProfile(id: string) {
    return get(`user/profile/${id}`);
};