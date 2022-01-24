<template>
  <div class="user-card" @click="selectUser(userId)">
    <div class="select-label" v-if="isUserSelected(userId)"></div>
    <span class="user-name" @click="goToUserSummaryPage">
      {{ userName }}
    </span>
    <span class="user-email">
      {{ userEmail }}
    </span>
    <span class="user-company">
      {{ userCompany }}
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    userId: {
      type: Number,
      default: 0,
      require: true,
    },
    userName: {
      type: String,
      default: "",
      require: true,
    },
    userEmail: {
      type: String,
      default: "",
      require: true,
    },
    userCompany: {
      type: String,
      default: "",
      require: true,
    },
  },
  computed: {
    ...mapGetters({
      selectedUsers: "getSelectedUsers",
    }),
  },
  methods: {
    ...mapActions({
      getUser: "getUser",
      selectUser: "selectUser",
    }),
    goToUserSummaryPage(event) {
      event.stopPropagation();
      this.getUser(this.userId);
      this.$router.push("/user");
    },
    isUserSelected(userId) {
      const user = this.selectedUsers.find((e) => e === userId);
      if (user) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  width: 230px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #aeaaaa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  cursor: pointer;
  transition: 0.3s all;
  height: fit-content;
  position: relative;
  .select-label {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #fe3500;
  }
  &:hover {
    transform: translateY(-1px);
  }
  .user-name {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 8px;
    width: fit-content;
    transition: 0.3s all;
    outline: none;
    &:hover {
      color: #fe3500;
    }
    &:active {
      transform: translateY(2px);
    }
  }
  .user-email,
  .user-company {
    color: gray;
  }
}
</style>
