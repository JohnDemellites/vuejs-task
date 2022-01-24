<template>
  <button :class="{ secondary: secondary, primary: !secondary }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    secondary: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 10px 16px;
  border-radius: 2px;
  border-style: solid;
  border-width: 1;
  font-weight: bold;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
}
.primary {
  color: #ffffff;
  background-color: #fe3500;
  border-color: #fe3500;
}
.secondary {
  color: #fe3500;
  background-color: #ffffff;
  border-color: #fe3500;
}
</style>
