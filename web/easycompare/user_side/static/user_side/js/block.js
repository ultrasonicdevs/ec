class Block {
    async getJSON(url, method, body) {
        JSON =  await fetch(url, {
            method, body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(res => res.json());
        return JSON.response;
    }
}