<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名：">
        <el-input v-model="form.user"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>

    <div class="bottom-button">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import { _getUserList, _createUser } from '@/service/user'

export default {
  name: 'userForm',
  data () {
    return {
      form: {
        user: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        const queryParams = {
          user: this.form.user,
          password: this.form.password
        }
        await _createUser({queryParams})
        this.$notify({
          title: '成功',
          message: '新建用户成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            name: "userList"
          })
        }, 1500)
      } catch (err) {
      }
    },
    handleCancel () {
      history.go(-1)
    },
    async queryUser (id) {
      const queryParams = { id }
      const res = await _getUserList({queryParams})
      this.form = res.list[0]
    }
  },
  beforeMount () {
    if (this.$route.name === 'userEdit') {
      this.queryUser(this.$route.params.userId)
    } else {
      this.form = {}
    }
  }
}
</script>
<style lang="sass" scoped>
.bottom-button
  float: right
</style>
