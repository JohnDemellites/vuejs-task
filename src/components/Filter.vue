<template>
  <div class="filter-container">
    <div class="title">
      Filter by:
    </div>
    <SelectBox :is-posts-page="isPostsPage" :is-albums-page="isAlbumsPage" />
    <TextBox :is-posts-page="isPostsPage" :is-albums-page="isAlbumsPage" />
    <div class="results" v-if="!loaderStatus">
      {{ numberOfResults }} results
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SelectBox from "./forms/SelectBox.vue"
import TextBox from "./forms/TextBox.vue"

export default {
  props: {
    isPostsPage: {
      type: Boolean,
      default: false
    },
    isAlbumsPage: {
      type: Boolean,
      default: false
    }
  },
  components: {
    TextBox,
    SelectBox
  },
  computed: {
    ...mapGetters({
      postsLength: 'getPostsLength',
      albumsLength: 'getAlbumsLength',
      loaderStatus: 'getLoaderStatus'
    }),
    numberOfResults() {
      const route = this.$route.path
      if (route === '/posts') {
        return this.postsLength
      } else if (route === '/albums') {
        return this.albumsLength
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  .title {
    white-space: nowrap;
  }
  .results {
    white-space: nowrap;
    font-weight: bold;
  }
}
</style>
