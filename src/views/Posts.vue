<template>
  <div class="posts">
    <PageHeader> Posts </PageHeader>
    <FilterBox :is-posts-page="true" />
    <div class="page-content">
      <SpinningLoader v-if="loaderStatus" />
      <PostCard
        v-else-if="!loaderStatus"
        v-for="(post, i) of posts"
        :key="i"
        :title="post.title"
        :body="post.body"
        :user="post.user"
      />
    </div>
    <Pagination
      v-if="!loaderStatus"
      :is-posts-page="true"
      :items="postsLength"
      :current-page="currentPage"
      @clickPageListener="nextPage"
    />
  </div>
</template>

<script>
import PageHeader from "./../components/PageHeader.vue";
import PostCard from "./../components/card/Card.vue";
import SpinningLoader from "../components/SpinningLoader.vue";
import Pagination from "../components/Pagination.vue";
import FilterBox from "../components/Filter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Posts",
  components: {
    PageHeader,
    PostCard,
    SpinningLoader,
    Pagination,
    FilterBox,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  created() {
    this.getAllPostsOrAlbums("posts");
  },
  computed: {
    ...mapGetters({
      posts: "getPaginatedPosts",
      loaderStatus: "getLoaderStatus",
      postsLength: "getPostsLength",
    }),
  },
  methods: {
    ...mapActions({
      getAllPostsOrAlbums: "getAllPostsOrAlbums",
    }),
    nextPage(event) {
      this.currentPage = event;
    },
  },
};
</script>

<style lang="scss" scoped>
.posts {
  .page-content {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
