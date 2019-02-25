

module.exports = {
  port: '3030',
  mongodb: {
    host: '',
    port: '',
    name: '',
    user: '',
    pwd:  ''
  },
  token: {
    secret: '',
    expires: '24h',
    unlesses: [/^\/login/]
  }
}