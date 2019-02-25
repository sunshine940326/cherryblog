module.exports = {
  port: '3030',
  mongodb: {
    name: 'cherryblog',
    host: '127.0.0.1',
    port: 27017,
  },
  token: {
    secret: 'cherryblog',
    expires: '4h',
    unlesses: [/^\/login/]
  }
}