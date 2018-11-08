import path from 'path'

export default{
  name: 'sidebarItem',
  data () {
    return {
      onlyOneChild: null
    }
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  methods: {
    hasOneShowingChild (children) {
      console.log('children', children)
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    resolvePath (...paths) {
      return path.resolve(this.basePath, ...paths)
    }
  },
  created () {
    console.log('this.item', this.item)
  }
}
