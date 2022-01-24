<template>
  <div class="tag-container">
    <span class="title"> Selected Users: </span>
    <div class="tags">
      <div
        class="tag"
        v-for="(userId, i) of selectedUsers"
        :key="i"
        @click="selectUser(userId)"
      >
        <span class="text">
          {{ getUserName(userId) }}
        </span>
        <img :src="closeIcon" class="icon" />
      </div>
    </div>
  </div>
</template>

<script>
import closeIcon from "../assets/close-icon.png";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      closeIcon,
    };
  },
  computed: {
    ...mapGetters({
      selectedUsers: "getSelectedUsers",
      users: "getAllUsers",
    }),
  },
  methods: {
    ...mapActions({
      selectUser: "selectUser",
    }),
    getUserName(userId) {
      const userDetails = this.users.find((element) => element.id === userId);
      return userDetails.name;
    },
  },
};
</script>

<style lang="scss" scoped>
.tag-container {
  margin-top: 24px;
  display: flex;
  align-items: center;
  .title {
    margin-right: 8px;
    white-space: nowrap;
  }
  .tags {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
    .tag {
      display: flex;
      align-items: center;
      border-style: solid;
      border: 1px solid #aeaaaa;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 4px;
      padding: 5px;
      cursor: pointer;
      transition: 0.3s all;
      &:hover {
        transform: translateY(-1px);
      }
      .text {
        font-size: 13px;
        margin-right: 5px;
      }
      .icon {
        width: 12px;
      }
    }
  }
}
</style>
