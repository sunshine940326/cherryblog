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
        prop="tagName"
        label="标签名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tagValue"
        label="value"
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
  name: 'tag',
  data () {
    return {
      tableData: []
    }
  },
  methods: {
    async fetchArticles () {
      const req = {
        url: 'http://localhost:3030/getTagList',
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
        this.tableData = res.data.list
        // loading.close()
      } catch (err) {
        console.log(err)
        // loading.close()
      }
    },
    handleEdit (index, row) {
      this.$router.push({
        name: "tagEdit",
        params: {
          tagId: row._id
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm(`此操作将永久删除 “${row.tagName}” 该标签, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const queryParams = {
          _id: row._id
        }
        const req = {
          url: 'http://localhost:3030/deleteTag',
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
        this.fetchArticles()
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
    this.fetchArticles()
  }
}
</script>
<style lang="sass" scoped>

</style>
