<template>
  <div class="user">
    <PageHeader
      :email="user.email"
      :phone="user.phone"
      :address="user.address.city"
      :company="user.company.name"
    >
      {{ user.name }}
    </PageHeader>
    <div class="page-content">
      <div class="button-container">
        <Button :secondary="!showUserPosts" @click.native="showPosts">
          Posts
        </Button>
        <Button :secondary="showUserPosts" @click.native="showAlbums">
          Albums
        </Button>
      </div>
      <div class="tab-content">
        <SpinningLoader v-if="loaderStatus" />
        <UserPosts v-if="!loaderStatus && showUserPosts" />
        <UserAlbums v-if="!loaderStatus && !showUserPosts" />
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from "./../components/PageHeader.vue";
import Button from "../components/Button.vue";
import UserPosts from "../components/user/posts.vue";
import UserAlbums from "../components/user/albums.vue";
import SpinningLoader from "../components/SpinningLoader.vue";
import { mapGetters } from "vuex";

export default {
  name: "User",
  components: {
    PageHeader,
    Button,
    UserPosts,
    SpinningLoader,
    UserAlbums,
  },
  data() {
    return {
      showUserPosts: true,
    };
  },
  computed: {
    ...mapGetters({
      user: "getUser",
      loaderStatus: "getLoaderStatus",
    }),
  },
  methods: {
    showAlbums() {
      this.showUserPosts = false;
    },
    showPosts() {
      this.showUserPosts = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  .page-content {
    margin-top: 24px;
    .button-container {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
    }
  }
}
</style>
