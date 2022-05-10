class Request {
  constructor () {
    this.urlToSections = `${location.protocol}//${location.host}/api/sections/`;
    this.urlToProductTypes = `${location.protocol}//${location.host}/api/product-types/`;
  }

  async sendRequest (url, method = 'GET', body = null, headersHTTP = null, hasCSRFtoken = null) {

    const XCSRFtoken = hasCSRFtoken ? this.getCookieByName('csrftoken') : null;

    const headers = {
      'X-CSRFToken': XCSRFtoken,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (headersHTTP) {
      for (let [key, value] of Object.entries(headersHTTP)) {
        if (value instanceof Object) {
          value = encodeURIComponent(JSON.stringify(value))
        }
        headers[key] = value;
      }
    }

    return await fetch(url, {
      method,
      body,
      headers,
    }).then(response => response.json())
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