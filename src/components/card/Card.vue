<template>
  <div
    class="card"
    :style="`max-width:${maxWidth};width:${maxWidth};`"
  >
    <div class="title">{{ title }}</div>
    <div class="body" v-if="body">{{ body }}</div>
    <div class="user" v-if="user">By {{ user }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    body: {
      type: String,
      default: "",
    },
    user: {
      type: String,
      default: "",
    },
    maxWidth: {
      type: String,
      default: "500px",
    }
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding: 16px;
  display: flex;
  flex-direction: column;
  border: 1px solid #aeaaaa;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
  height: fit-content;
  .title {
    font-size: 24px;
    font-weight: bold;
    color: black;
  }
  .body {
    font-size: 16px;
    color: black;
    margin-top: 8px;
  }
  .user {
    font-size: 13px;
    color: gray;
    margin-top: 8px;
  }
}
</style>
