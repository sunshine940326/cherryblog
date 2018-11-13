<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题：">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="摘要：">
        <el-input v-model="form.des"></el-input>
      </el-form-item>
      <el-form-item label="内容：">
        <c-markdown-editor v-model="form.content" class="editor" ref="editor"></c-markdown-editor>
      </el-form-item>
      <el-form-item label="分类：">
        <el-select v-model="form.classify" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签：">
        <el-select v-model="form.tag" multiple placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="封面：">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="状态：">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">上线</el-radio>
          <el-radio :label="2">下线</el-radio>
        </el-radio-group>
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

export default {
  name: 'articleForm',
  components: { cMarkdownEditor },
  data () {
    return {
      form: {
        title: '',
        des: '',
        content: '',
        classify: '',
        tag: [],
        status: 1
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    }
  },
  methods: {
    async onSubmit () {
      const req = {
        url: 'http://localhost:3030/article',
        method: 'POST',
        data: this.form
      }

      try {
        const res = await this.$http(req)
        console.log(res)
        return `发表文章成功`
      } catch (err) {
        console.log(err)
      }
    },
    handleCancel () {
      history.go(-1)
    }
  }
}
</script>
<style lang="sass" scoped>
.bottom-button
  float: right
</style>
