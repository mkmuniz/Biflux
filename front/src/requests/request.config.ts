const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API;
const requestHeaders = {
    'Content-Type': 'application/json'
};

export async function get(url: string) {
    try {
        const res = await fetch(baseUrl + url,
            {
                method: 'GET',
                headers: requestHeaders,
            })

        return res.json();
    } catch (err) {
        console.error(err);
    }
}

export async function post(url: string, body: any) {
    try {
        const res = await fetch(baseUrl + url, {
            method: 'POST',
            headers: requestHeaders,
            body: JSON.stringify(body)
        })

        return {
            data: res.json(),
            status: res.status
        };
    } catch (err) {
        console.error(err);
    }
};

export async function upload(url: string, body: any) {
    try {
        const res = await fetch(baseUrl + url, {
            method: 'POST',
            body
        });

        return {
            data: res.json(),
            status: res.status
        }
    } catch (err: any) {
        console.error(err.message);
    }
};

export async function patch(url: string, body: any) {
    try {
        const res = await fetch(baseUrl + url, {
            method: 'PATCH',
            headers: requestHeaders,
            body: JSON.stringify(body)
        })

        return {
            data: res.json(),
            status: res.status
        };
    } catch (err) {
        console.error(err);
    };
};