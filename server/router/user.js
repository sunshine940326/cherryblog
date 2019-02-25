module.exports = (app, router) => {
  const controller = app.controller.user

  router.post('/login', controller.login)
  router.post('/createUser', controller.createUser)
  router.post('/deleteUser', controller.deleteUser)
  router.post('/getUserList', controller.queryUser)
}