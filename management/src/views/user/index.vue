<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="user"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createAt"
        label="创建时间">
      </el-table-column>
      <!-- <el-table-column
        prop="address"
        label="更新时间">
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'user',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async fetchUsers () {
      const req = {
        url: 'http://localhost:3030/getUserList',
        method: 'POST'
      }
      try {
        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // })
        const res = await this.$http(req)
        this.tableData = res.list
        // loading.close()
      } catch (err) {
        console.log(err)
        // loading.close()
      }
    },
    handleEdit (index, row) {
      this.$router.push({
        name: "userEdit",
        params: {
          userId: row._id
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm(`此操作将永久删除 “${row.user}” 该用户, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const queryParams = {
          _id: row._id
        }
        const req = {
          url: 'http://localhost:3030/deleteUser',
          method: 'POST',
          data: queryParams
        }
        try {
          await this.$http(req)
        } catch (err) {
          console.log(err)
        }
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.fetchUsers()
        loading.close()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  beforeMount () {
    this.fetchUsers()
  }
}
</script>
<style lang="sass" scoped>

</style>
