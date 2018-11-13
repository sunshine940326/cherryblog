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
      <el-input v-model="input" placeholder="标题/描述" width="60px"></el-input>
      <el-button type="primary" @click="CreateArticle">新建文章</el-button>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
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

    <!-- <div class="pagination">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div> -->
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
      tableData: [
        {
          toc: [],
          tags: [
            {
              _id: "5be7032b883e02ad8a538992",
              title: "测试",
              value: "test",
              createAt: "2018-11-10T16:11:23.453Z",
              updateAt: "2018-11-10T16:11:23.453Z",
              __v: 0
            }
          ],
          state: "publish",
          readingQuantity: 0,
          createAt: "2018-11-10T16:13:41.612Z",
          updateAt: "2018-11-10T15:35:38.858Z",
          _id: "5be703b5883e02ad8a538994",
          author: {
            avatar:
              "http://p39p1kvxn.bkt.clouddn.com/FrgZ2d6bbj7Th1w3m7lD7cCLBcBj",
            roles: ["admin", "user"],
            lastLoginAt: "2018-11-10T16:13:18.879Z",
            createAt: "2018-11-10T15:35:38.881Z",
            _id: "5be6faf5883e02ad8a538991",
            account: "admin",
            passwd: "d94713baabbfc993ecb075d053b873c5",
            __v: 0
          },
          title: "测试",
          desc: "测试",
          cover: "",
          content: "测试",
          classify: {
            _id: "5be7035d883e02ad8a538993",
            title: "测试分类",
            value: "test",
            createAt: "2018-11-10T16:12:13.535Z",
            updateAt: "2018-11-10T16:12:13.535Z",
            __v: 0
          },
          html: "<p>测试</p>\n",
          __v: 0
        },
        {
          toc: [],
          tags: [
            {
              _id: "5be7032b883e02ad8a538992",
              title: "测试",
              value: "test",
              createAt: "2018-11-10T16:11:23.453Z",
              updateAt: "2018-11-10T16:11:23.453Z",
              __v: 0
            }
          ],
          state: "publish",
          readingQuantity: 0,
          createAt: "2018-11-10T16:13:41.612Z",
          updateAt: "2018-11-10T15:35:38.858Z",
          _id: "5be703b5883e02ad8a538994",
          author: {
            avatar:
              "http://p39p1kvxn.bkt.clouddn.com/FrgZ2d6bbj7Th1w3m7lD7cCLBcBj",
            roles: ["admin", "user"],
            lastLoginAt: "2018-11-10T16:13:18.879Z",
            createAt: "2018-11-10T15:35:38.881Z",
            _id: "5be6faf5883e02ad8a538991",
            account: "admin",
            passwd: "d94713baabbfc993ecb075d053b873c5",
            __v: 0
          },
          title: "测试",
          desc: "测试",
          cover: "",
          content: "测试",
          classify: {
            _id: "5be7035d883e02ad8a538993",
            title: "测试分类",
            value: "test",
            createAt: "2018-11-10T16:12:13.535Z",
            updateAt: "2018-11-10T16:12:13.535Z",
            __v: 0
          },
          html: "<p>测试</p>\n",
          __v: 0
        },
        {
          toc: [],
          tags: [
            {
              _id: "5be7032b883e02ad8a538992",
              title: "测试",
              value: "test",
              createAt: "2018-11-10T16:11:23.453Z",
              updateAt: "2018-11-10T16:11:23.453Z",
              __v: 0
            }
          ],
          state: "publish",
          readingQuantity: 0,
          createAt: "2018-11-10T16:13:41.612Z",
          updateAt: "2018-11-10T15:35:38.858Z",
          _id: "5be703b5883e02ad8a538994",
          author: {
            avatar:
              "http://p39p1kvxn.bkt.clouddn.com/FrgZ2d6bbj7Th1w3m7lD7cCLBcBj",
            roles: ["admin", "user"],
            lastLoginAt: "2018-11-10T16:13:18.879Z",
            createAt: "2018-11-10T15:35:38.881Z",
            _id: "5be6faf5883e02ad8a538991",
            account: "admin",
            passwd: "d94713baabbfc993ecb075d053b873c5",
            __v: 0
          },
          title: "测试",
          desc: "测试",
          cover: "",
          content: "测试",
          classify: {
            _id: "5be7035d883e02ad8a538993",
            title: "测试分类",
            value: "test",
            createAt: "2018-11-10T16:12:13.535Z",
            updateAt: "2018-11-10T16:12:13.535Z",
            __v: 0
          },
          html: "<p>测试</p>\n",
          __v: 0
        }
      ],
      currentPage3: 1
    }
  },
  methods: {
    CreateArticle () {
      this.$router.push({
        name: "articleCreate"
      })
    }
    // handleCurrentChange () {

    // }
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
