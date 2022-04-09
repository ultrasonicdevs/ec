class Block {

    async getJSON (url, method, body, header) {
        let headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            };
        if (header) {
            for (let [key, value] of Object.entries(header)) {
                console.log(key, value);
                headers[key] = value;
                if (typeof value === "object") {
                    value = encodeURI(JSON.stringify(value))
                    // console.log(value)
                }
            }
        }
        const json = await fetch(url, {
            method, body,headers
        }).then(res => res.json());
        return json.response;
        }



    getCookieByName(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}