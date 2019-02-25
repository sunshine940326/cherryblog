export default{
  name: 'login',
  data (){
    return {
      user: '',
      password: ''
    }
  },
  methods: {
    async handleLogin () {
      let queryParams = {
        user: this.user,
        password: this.password
      }

      const req = {
        url: 'http://localhost:3030/login',
        method: 'POST',
        data: queryParams
      }
      try {
        const res = await this.$http(req)
        if (res.code === 'success') {
          this.$notify({
            title: '成功',
            message: '登录成功',
            type: 'success'
          })
          sessionStorage.setItem('token', res.token)
          sessionStorage.setItem('isLogin', true)
          setTimeout(() => {
            this.$router.push({
              name: 'dashboard'
            })
          }, 1500)
        }else{
          this.$notify.error({
            title: '错误',
            message: '用户名或密码错误'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}