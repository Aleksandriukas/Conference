import { Auth } from './BaseUrl';
export const login = async (email: string, password: string) => {
    const response = await fetch(Auth + '/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log('data', data);
        return;
    }
};
