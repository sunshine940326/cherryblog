<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" clearable></el-input>
      </el-form-item>
      <el-form-item label="摘要：">
        <el-input v-model="form.desc" clearable></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <c-markdown-editor v-model="form.content" class="editor" ref="editor"></c-markdown-editor>
      </el-form-item>
      <!-- <el-form-item label="分类：">
        <el-select v-model="form.classify" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="作者：">
        <el-input class="width200" clearable v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="标签：">
        <el-select class="width200" clearable v-model="form.tag"  placeholder="请选择">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="封面：">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="状态：" clearable
      >
        <el-radio v-model="state" label="draft">草稿</el-radio>
        <el-radio v-model="state" label="publish">上线</el-radio>
      </el-form-item>
    </el-form>

    <div class="bottom-button">
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>
<script>
import cMarkdownEditor from '@/components/c-markdown-editor/c-markdown-editor'
import { _getTagList } from '@/service/tag.js'
import { _updateArticle, _createArticleItem, _getArticleList } from '@/service/article.js'
export default {
  name: 'articleForm',
  components: { cMarkdownEditor },
  watch: {
    form (value) {
      console.log('value', value)
    }
  },
  data () {
    return {
      form: {
        title: '',
        desc: '',
        content: '',
        classify: [],
        tag: []
      },
      options: [],
      state: 'draft',
      isCreate: true
    }
  },
  methods: {
    async onSubmit () {
      const { content, desc, title, tag, author } = this.form
      const queryParams = {
        id: this.$route.params.articleId || null,
        content,
        desc,
        title,
        state: this.state,
        tag,
        author
      }
      try {
        this.isCreate ? await _createArticleItem({queryParams}) : await _updateArticle({queryParams})
        this.$notify({
          title: '成功',
          message: this.isCreate ? '新建文章成功' : '修改文章成功',
          type: 'success'
        })
        setTimeout(() => {
          this.$router.push({
            name: "articleList"
          })
        }, 1500)
      } catch (err) {
        console.log(err)
      }
    },
    handleCancel () {
      history.go(-1)
    }
  },
  async beforeMount () {
    if (this.$route.name === 'articleEdit') {
      this.isCreate = false
      const queryParams = {
        id: this.$route.params.articleId
      }
      const res = await _getArticleList({queryParams})
      this.form = res.list[0]
    } else {
      this.form = {}
    }
    const res = await _getTagList()
    this.options = res.list.map(item => {
      return {
        value: item.tagValue
      }
    })
  }
}
</script>
<style lang="sass" scoped>
.bottom-button
  float: right
.width200
  width: 200px
</style>
