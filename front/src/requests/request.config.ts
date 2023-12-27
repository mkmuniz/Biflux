const baseUrl = process.env.API_BASE_URL || 'http://localhost:4000';

export async function get(url: string) {
    const resp = await fetch(baseUrl + url,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const data = await resp.json();

    return data;
}

export async function post(url: string, body: any) {
    try {
        const resp = await fetch(baseUrl + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const data = await resp.json();
    
        return { data, status: resp.status };
    } catch (err) {
        console.error(err);
    };
};