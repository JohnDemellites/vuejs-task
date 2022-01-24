<template>
  <div id="navigation-bar">
    <div class="button-container">
      <Button @click.native="goTo('/')" :secondary="!isInHomePage">
        Home
      </Button>
      <Button @click.native="goTo('/posts')" :secondary="!isInPostsPage">
        Posts
      </Button>
      <Button @click.native="goTo('/albums')" :secondary="!isInAlbumsPage">
        Albums
      </Button>
    </div>
  </div>
</template>

<script>
import Button from "./Button.vue";
export default {
  components: {
    Button,
  },
  computed: {
    isInHomePage() {
      return this.$route.path === "/" || this.$route.path === "/user";
    },
    isInPostsPage() {
      return this.$route.path === "/posts";
    },
    isInAlbumsPage() {
      return this.$route.path === "/albums";
    },
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
#navigation-bar {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 32px;
  border-bottom-style: solid;
  border-width: 1px;
  border-color: gray;
  .button-container {
    display: flex;
    align-items: center;
    gap: 16px;
  }
}
</style>
