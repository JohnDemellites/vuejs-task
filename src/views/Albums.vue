<template>
  <div class="albums">
    <PageHeader> Albums </PageHeader>
    <FilterBox :is-albums-page="true" />
    <div class="page-content">
      <SpinningLoader v-if="loaderStatus" />
      <AlbumsCard
        v-else-if="!loaderStatus"
        v-for="(album, i) of albums"
        :key="i"
        :title="album.title"
        :user="album.user"
      />
    </div>
    <Pagination
      v-if="!loaderStatus"
      :is-albums-page="true"
      :items="albumsLength" 
      :current-page="currentPage" 
      @clickPageListener="nextPage" 
    />
  </div>
</template>

<script>
import PageHeader from "./../components/PageHeader.vue";
import AlbumsCard from "./../components/card/Card.vue";
import SpinningLoader from "../components/SpinningLoader.vue";
import Pagination from "../components/Pagination.vue";
import FilterBox from "../components/Filter.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    PageHeader,
    AlbumsCard,
    SpinningLoader,
    Pagination,
    FilterBox
  },
  data() {
    return {
      currentPage: 1
    }
  },
  created() {
    this.getAllPostsOrAlbums('posts')
  },
  computed: {
    ...mapGetters({
      albums: 'getPaginatedAlbums',
      loaderStatus : 'getLoaderStatus',
      albumsLength: 'getAlbumsLength'
    })
  },
  methods: {
    ...mapActions({
      getAllPostsOrAlbums: 'getAllPostsOrAlbums'
    }),
    nextPage(event) {
      this.currentPage = event
    }
  }
}
</script>

<style lang="scss" scoped>
.albums {
  .page-content {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
}
</style>
