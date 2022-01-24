<template>
  <div class="home">
    <PageHeader> Users </PageHeader>
    <Tag />
    <div class="page-content">
      <UserCard
        v-for="(user, i) in users"
        :key="i"
        :user-id="user.id"
        :user-name="user.name"
        :user-email="user.email"
        :user-company="user.company.name"
      />
    </div>
  </div>
</template>

<script>
import PageHeader from "./../components/PageHeader.vue";
import UserCard from "./../components/card/UserCard.vue";
import Tag from "./../components/Tag.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    PageHeader,
    UserCard,
    Tag
  },
  computed: {
    ...mapGetters({
      users: "getAllUsers"
    }),
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions({
      getUsers: "getUsers",
    }),
  },
};
</script>

<style lang="scss" scoped>
.home {
  .page-content {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
