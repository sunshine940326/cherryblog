import { _login } from '@/service/login.js'
import { _createUser } from '@/service/user.js'
import cookie from 'js-cookie'

export default{
  name: 'login',
  data(){
    return {
      user: '',
      password: '',
      repassword: '',
      isLogin: true
    }
  },
  watch: {
    '$route'(val) {
      this.isLogin = val.name === 'login'
    }
  },
  methods: {
    handleRegister() {
      this.$router.push({
        name: this.isLogin ? 'register' : 'login'
      })
    },
    async clickLogin() {
      let queryParams = {
        user: this.user,
        password: this.password
      }
      const res = await _login({queryParams})
      if (res.code === 'success') {
        this.$notify({
          title: '成功',
          message: '登录成功',
          type: 'success'
        })
        cookie.set('token', res.token)
        cookie.set('isLogin', true)
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
    },
    async clickRegister() {
      if(this.password !== this.repassword){
        this.$notify.error({
          title: '错误',
          message: '两次输入密码不一致',
          duration: 0
        })
      }
      let queryParams = {
        user: this.user,
        password: this.password,
        repassword: this.repassword
      }
      await _createUser({queryParams})
      setTimeout(() => {
        this.$router.push({
          name: 'login'
        })
      }, 2000)
      this.$notify({
        title: '成功',
        message: '创建成功',
        type: 'success'
      })
    },
    async handleClick () {
      this.isLogin ? this.clickLogin() : this.clickRegister()
    }
  },
  beforeMount() {
    this.isLogin = this.$route.name === 'login'
  }
}