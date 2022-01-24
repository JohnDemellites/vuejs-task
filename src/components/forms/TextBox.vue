<template>
  <input type="text" placeholder="Title" class="text-box" v-model="filter" />
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    isPostsPage: {
      type: Boolean,
      default: false,
    },
    isAlbumsPage: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      filterWord: "getFilterWord",
    }),
    filter: {
      get() {
        return this.filterWord;
      },
      set(value) {
        this.updateFilterWord(value);
        this.filterResults("posts");
        this.filterResults("albums");
      },
    },
  },
  methods: {
    ...mapActions({
      filterResults: "filterResults",
      updateFilterWord: "updateFilterWord",
    }),
  },
};
</script>

<style lang="scss" scoped>
.text-box {
  padding: 8px;
  font-weight: bold;
  max-width: 200px;
  width: 100%;
  border-radius: 2px;
  border-width: 1px;
  font-size: 13px;
}
</style>
