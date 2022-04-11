class Request {
  constructor () {
    this.urlToSections = `${location.protocol}//${location.host}/api/sections/`;
    this.urlToProductTypes = `${location.protocol}//${location.host}/api/product-types/`;
  }

  async sendRequest (url, method, body = null, hasCSRFtoken = null) {
    const XCSRF = hasCSRFtoken ? this.getCookieByName('csrftoken') : null;
    
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