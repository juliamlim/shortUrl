class Database {
  constructor(host) {
    this.host = host;
  }

  get data() {
    return fetch('https://api.mockaroo.com/api/f271b7b0?count=5&key=44f77fe0')
      .then(res => res.json())
      .then(res => {
        return res.map(v => ({
          ...v,
          shortUrl: `${this.host}go/${v.id}`
        }))  
      });
  }
}

module.exports = Database;
