<script lang="tsx">
import { SetupContext } from 'vue'
export default {
  props: {
    pageSizes: {
      type: Array,
      default: [10, 20, 30, 40, 50]
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  emits: ['handleSizeChange', 'handleCurrentChange'],
  setup(props: { [key in string]?: any }, { emit }: SetupContext) {
    const handleSizeChange = (val: string|number) => {
      emit('handleSizeChange', val)
    }
    const handleCurrentChange = (val: string|number) => {
      emit('handleCurrentChange', val)
    }
    return () => (
      <>
      <elPagination
        onSizeChange={ handleSizeChange }
        onCurrentChange={ handleCurrentChange }
        currentPage={ props.currentPage }
        pageSizes={ props.pageSizes }
        pageSize={ props.pageSize }
        layout={ props.layout }
        total={ props.total }
      />
      </>
    )
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  position: relative;
  top: 1rem;
}
</style>