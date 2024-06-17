import { initializeUser } from './api';

export function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

export function getCookie(name: string): string {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1); // Add 1 for the '=' character
        }
    }
    return '';
}

export async function getUserId() {
    const userIdKey = 'userId';
    let userId = getCookie(userIdKey);
    let userIdNew;

    if (!userId) {
        //call the API to get the user id and create the user in the database
        userIdNew = await initializeUser();
        setCookie(userIdKey, userIdNew, 1);  // Set cookie for 1 day
        return userIdNew;
    }
    return userId;
}