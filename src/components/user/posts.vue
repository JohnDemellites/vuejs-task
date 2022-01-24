<template>
  <div id="posts">
    <PostCard
      v-for="(userPost, i) of userPosts"
      :key="i"
      :title="userPost.title"
      :body="userPost.body"
    />
  </div>
</template>

<script>
import PostCard from "../card/Card.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    PostCard,
  },
  computed: {
    ...mapGetters({
      userPosts: "getUserPosts",
    }),
  },
};
</script>

<style lang="scss" scoped>
#posts {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
