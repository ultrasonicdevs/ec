class Block {
  constructor (options) {
    this.id = options._id;
    this.name = options.name;
  }

  async getJSON (url, method, body = null) {
    return await fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    }).then(data => data.json());
  }
}