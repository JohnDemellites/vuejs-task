<template>
    <div class="pagination">
      <div
        v-for="i of Math.floor(items / 10)" :key="i"
        class="pagination-item"
        :class="{'current-page': currentPage === i}"   
        @click="clickPage(i)" 
    >{{ i }}</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    items: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    isPostsPage: {
      type: Boolean,
      default: false
    },
    isAlbumsPage: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      paginate: 'paginate'
    }),
    clickPage(page) {
      this.$emit('clickPageListener', page)
      if (this.isPostsPage) {
        this.paginate({
          currentPage: page,
          page: 'posts'
        })
      }
      if (this.isAlbumsPage) {
        this.paginate({
          currentPage: page,
          page: 'albums'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  gap: 16px;
  .pagination-item {
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
  }
  .current-page {
    color: #fe3500;
    text-decoration: underline;
  }
}
</style>