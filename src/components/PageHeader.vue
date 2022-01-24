<template>
  <div class="page-header">
    <div class="title">
      <slot></slot>
    </div>
    <div class="user-details" v-if="email || phone || address || company">
      <b>Email:</b> {{ email }} | <b>Phone:</b> {{ phone }} | <b>City:</b>
      {{ address }} | <b>Company:</b> {{ company }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    company: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  padding: 24px 16px;
  border-bottom-style: solid;
  border-width: 1px;
  border-color: gray;
  .title {
    font-size: 32px;
    font-weight: bold;
  }
  .user-details {
    font-weight: 13px;
    margin-top: 8px;
  }
}
</style>
