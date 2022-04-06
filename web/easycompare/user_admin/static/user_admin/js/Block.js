class Block {
  constructor (options) {
    console.log('Блок: ', options)
    this.id = options.id;
    this.name = options.name;
  }

  async sendRequest (url, method, body = null, hasCSRFtoken = null) {
    const XCSRF = hasCSRFtoken ? this.getCookieByName('csrftoken') : null;
    console.log(XCSRF)
    return await fetch(url, {
      method,
      body,
      headers: {
        'X-CSRFToken': XCSRF,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }).then(data => data.json());
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