class Block {
    async getJSON(url, method, body) {
        return await fetch(url, {
            method, body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(res => res.json())
    }
}