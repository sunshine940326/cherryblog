<template>
  <div>
    <div class="article-search">
      <el-select v-model="value" placeholder="分类">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="value" placeholder="状态">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="queryTitle" placeholder="标题/描述" width="60px"></el-input>
      <el-button type="primary" @click="CreateArticle">新建文章</el-button>
      <el-button type="primary" @click="queryArticle" icon="el-icon-search">搜索</el-button>
    </div>
    <divider></divider>
    <div class="article-list">
      <template>
        <el-table :data="tableData" border stripe style="width: 100%">
          <el-table-column prop="_id" label="id">
          </el-table-column>
          <el-table-column prop="title" label="标题">
          </el-table-column>
          <el-table-column prop="classify.title" label="分类">
          </el-table-column>
          <el-table-column prop="author.account" label="作者">
          </el-table-column>
          <el-table-column prop="state" label="状态">
          </el-table-column>
          <el-table-column prop="createAt" label="创建时间">
          </el-table-column>
          <el-table-column prop="updateAt" label="更新时间">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import divider from "@/components/divider"

export default {
  name: 'article',
  components: {
    divider
  },
  data () {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData: [],
      currentPage: 1,
      limit: 10,
      queryTitle: null,
      total: 0
    }
  },
  computed: {
    offset () {
      return (this.currentPage - 1) * this.limit || 0
    }
  },
  methods: {
    CreateArticle () {
      this.$router.push({
        name: "articleCreate"
      })
    },
    handleCurrentChange (page) {
      this.fetchArticles()
    },
    queryArticle () {
      this.currentPage = 1
      this.fetchArticles()
    },
    async fetchArticles () {
      const queryParams = {
        title: this.queryTitle,
        limit: this.limit,
        offset: this.offset
      }
      const req = {
        url: 'http://localhost:3030/getArticleList',
        method: 'POST',
        data: queryParams
      }
      try {
        const res = await this.$http(req)
        this.tableData = res.data.articleList
        this.total = res.data.total
      } catch (err) {
        console.log(err)
      }
    },
    handleEdit (index, row) {
      this.$router.push({
        name: "articleEdit",
        params: {
          articleId: row._id
        }
      })
    },
    handleDelete (index, row) {
      this.$confirm(`此操作将永久删除 “${row.title}” 该文章, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const queryParams = {
          _id: row._id
        }
        const req = {
          url: 'http://localhost:3030/deleteArticle',
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
.article-search
  .el-input
    width: 200px
  .el-button
    float: right
    margin-right: 20px
.pagination
  margin-top: 20px
  float: right
</style>
