<template>
  <div id="albums">
    <AlbumsCard
      max-width="300px"
      v-for="(userAlbum, i) of userAlbums"
      :key="i"
      :title="userAlbum.title"
    />
  </div>
</template>

<script>
import AlbumsCard from "../card/Card.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    AlbumsCard,
  },
  computed: {
    ...mapGetters({
      userAlbums: "getUserAlbums",
    }),
  },
};
</script>

<style lang="scss" scoped>
#albums {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
