<template>
  <div>
    <div class="article-search">
      <el-select v-model="tag" placeholder="标签" clearable>
        <el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="state" placeholder="状态" clearable>
        <el-option v-for="item in stateOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="queryTitle" placeholder="标题/描述" width="60px" clearable></el-input>
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
          <el-table-column prop="tag" label="标签" >
          </el-table-column>
          <el-table-column prop="author" label="作者">
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
import { _getArticleList, _deleteArticle } from '@/service/article'
import { _getTagList } from '@/service/tag'
export default {
  name: 'article',
  components: {
    divider
  },
  data () {
    return {
      tag: "",
      state: "",
      tableData: [],
      currentPage: 1,
      limit: 10,
      queryTitle: '',
      total: 0,
      tagOptions: [],
      stateOptions: [
        {
          label: "草稿",
          value: "draft"
        },
        {
          label: "发布",
          value: "publish"
        }
      ]
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
      let conditions = {
        title: this.queryTitle,
        state: this.state,
        tag: this.tag,
        limit: this.limit,
        offset: this.offset
      }
      let queryParams = {}
      Object.keys(conditions).map(key => {
        conditions[key] && (queryParams[key] = conditions[key])
      })
      const res = await _getArticleList({queryParams})
      this.tableData = res.list
      this.total = res.total
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
        await _deleteArticle({ queryParams })
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.fetchArticles()
        loading.close()
        this.$notify({
          title: '成功',
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$notify.info({
          title: '消息',
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async filter () {
      const res = await _getTagList()
      this.tagOptions = res.list.map(item => {
        return {
          value: item.tagValue,
          label: item.tagValue
        }
      })
    }
  },
  async beforeMount () {
    this.fetchArticles()
    this.filter()
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
