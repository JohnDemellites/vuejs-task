import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import VuexPersistence from "vuex-persist";
import {
  SPINNING_LOADER_STATUS,
  SET_USERS,
  SET_USER,
  SELECT_USER,
  REMOVE_USER,
  SET_ALL_POSTS,
  SET_POSTS_OF_USER,
  SET_ALL_ALBUMS,
  SET_ALBUMS_OF_USER,
  FILTER_WORD,
  SET_POSTS_OF_SELECTED_USERS,
  SET_ALBUMS_OF_SELECTED_USERS,
  FILTER_POSTS,
  SET_FILTERED_POSTS_LENGTH,
  FILTER_ALBUMS,
  SET_FILTERED_ALBUMS_LENGTH,
  PAGINATE_POSTS,
  PAGINATE_ALBUMS,
} from "./mutation-types";

Vue.use(Vuex);
Vue.use(VueAxios, axios);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export default new Vuex.Store({
  state: {
    users: [],
    user: {},
    userPosts: [],
    userAlbums: [],
    loaderStatus: false,
    allPosts: [],
    allAlbums: [],
    selectedUsers: [],
    filteredPostsLength: 0,
    filteredAlbumsLength: 0,
    filteredPosts: [],
    selectedUsersPosts: [],
    filterWord: "",
    filteredAlbums: [],
    selectedUsersAlbums: [],
    paginatedPosts: [],
    paginatedAlbums: [],
  },
  mutations: {
    [SPINNING_LOADER_STATUS](state, payload) {
      state.loaderStatus = payload;
    },
    [SET_USERS](state, payload) {
      state.users = payload;
    },
    [SET_USER](state, payload) {
      state.user = payload;
    },
    [SELECT_USER](state, payload) {
      state.selectedUsers.push(payload);
    },
    [REMOVE_USER](state, payload) {
      const index = state.selectedUsers.indexOf(payload);
      if (index > -1) {
        state.selectedUsers.splice(index, 1);
      }
    },
    [SET_ALL_POSTS](state, payload) {
      state.allPosts = payload;
    },
    [SET_POSTS_OF_USER](state, payload) {
      state.userPosts = payload;
    },
    [SET_ALL_ALBUMS](state, payload) {
      state.allAlbums = payload;
    },
    [SET_ALBUMS_OF_USER](state, payload) {
      state.userAlbums = payload;
    },
    [FILTER_WORD](state, payload) {
      state.filterWord = payload;
    },
    [SET_POSTS_OF_SELECTED_USERS](state, payload) {
      state.selectedUsersPosts = payload;
    },
    [SET_ALBUMS_OF_SELECTED_USERS](state, payload) {
      state.selectedUsersAlbums = payload;
    },
    [FILTER_POSTS](state, payload) {
      state.filteredPosts = payload;
    },
    [SET_FILTERED_POSTS_LENGTH](state, payload) {
      state.filteredPostsLength = payload;
    },
    [FILTER_ALBUMS](state, payload) {
      state.filteredAlbums = payload;
    },
    [SET_FILTERED_ALBUMS_LENGTH](state, payload) {
      state.filteredAlbumsLength = payload;
    },
    [PAGINATE_POSTS](state, payload) {
      state.paginatedPosts = payload;
    },
    [PAGINATE_ALBUMS](state, payload) {
      state.paginatedAlbums = payload;
    },
  },
  getters: {
    getLoaderStatus(state) {
      return state.loaderStatus;
    },
    getAllUsers(state) {
      return state.users;
    },
    getUser(state) {
      return state.user;
    },
    getUserPosts(state) {
      return state.userPosts;
    },
    getUserAlbums(state) {
      return state.userAlbums;
    },
    getSelectedUsers(state) {
      return state.selectedUsers;
    },
    getPostsLength(state) {
      return state.filteredPostsLength;
    },
    getAlbumsLength(state) {
      return state.filteredAlbumsLength;
    },
    getFilterWord(state) {
      return state.filterWord;
    },
    getPaginatedPosts(state) {
      return state.paginatedPosts;
    },
    getPaginatedAlbums(state) {
      return state.paginatedAlbums;
    },
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const response = await axios.get("/users");
        commit(SET_USERS, response.data);
      } catch (error) {
        console.error(error);
      }
    },
    getUser({ commit, state, dispatch }, userId) {
      const user = state.users.filter((e) => e.id === userId);
      commit(SET_USER, user[0]);
      commit(SPINNING_LOADER_STATUS, true);
      dispatch("getUserPostsAlbums", userId);
    },
    selectUser({ commit, state }, payload) {
      let userId = state.selectedUsers.find((e) => e === payload);
      if (!userId) {
        commit(SELECT_USER, payload);
      } else {
        commit(REMOVE_USER, payload);
      }
    },
    async getUserPostsAlbums({ commit }, payload) {
      try {
        const posts = await axios.get(`/posts?userId=${payload}`);
        const albums = await axios.get(`/albums?userId=${payload}`);
        commit(SET_POSTS_OF_USER, posts.data);
        commit(SET_ALBUMS_OF_USER, albums.data);
        commit(SPINNING_LOADER_STATUS, false);
      } catch (error) {
        console.error(error);
      }
    },
    async getAllPostsOrAlbums({ commit, state, dispatch }, page) {
      try {
        let response;
        commit(SPINNING_LOADER_STATUS, true);
        if (state.selectedUsers.length === 0) {
          response = await axios.get(`/${page}`);
          for (let i = 0; i < response.data.length; i++) {
            let user = state.users.find(
              (element) => element.id === response.data[i].userId
            );
            response.data[i].user = user.name;
          }
          if (page === "posts") {
            commit(SET_ALL_POSTS, response.data);
          } else if (page === "albums") {
            commit(SET_ALL_ALBUMS, response.data);
          }
        } else {
          const tempArray = [];
          for (let i = 0; i < state.selectedUsers.length; i++) {
            response = await axios.get(
              `/${page}?userId=${state.selectedUsers[i]}`
            );
            for (let e = 0; e < response.data.length; e++) {
              let user = state.users.find(
                (element) => element.id === response.data[e].userId
              );
              response.data[e].user = user.name;
            }
            tempArray.push(response.data);
            if (page === "posts") {
              commit(SET_POSTS_OF_SELECTED_USERS, tempArray.flat());
            } else if (page === "albums") {
              commit(SET_ALBUMS_OF_SELECTED_USERS, tempArray.flat());
            }
          }
        }
        dispatch("filterResults", page);
        commit(SPINNING_LOADER_STATUS, false);
      } catch (error) {
        console.error(error);
      }
    },
    filterResults({ commit, state, dispatch }, page) {
      commit(SPINNING_LOADER_STATUS, true);
      let resultsArray = [],
        tempArray = [];
      if (page === "posts") {
        if (state.selectedUsers.length > 0) {
          tempArray = state.selectedUsersPosts;
        } else {
          tempArray = state.allPosts;
        }
      } else if (page === "albums") {
        if (state.selectedUsers.length > 0) {
          tempArray = state.selectedUsersAlbums;
        } else {
          tempArray = state.allAlbums;
        }
      }
      for (let i = 0; i < tempArray.length; i++) {
        if (tempArray[i].title.indexOf(state.filterWord) > -1) {
          resultsArray.push(tempArray[i]);
        }
      }
      if (page === "posts") {
        commit(FILTER_POSTS, resultsArray);
        commit(SET_FILTERED_POSTS_LENGTH, resultsArray.length);
      } else if (page === "albums") {
        commit(FILTER_ALBUMS, resultsArray);
        commit(SET_FILTERED_ALBUMS_LENGTH, resultsArray.length);
      }
      dispatch("paginate", { currentPage: 1, page: page });
    },
    paginate({ commit, state }, payload) {
      let PAGE, END, START;
      const { currentPage, page } = payload;
      if (currentPage === 1) {
        PAGE = currentPage - 1;
        END = PAGE + 10;
        START = END - 10;
      } else {
        PAGE = currentPage;
        END = PAGE * 10;
        START = END - 10;
      }
      if (page === "posts") {
        commit(PAGINATE_POSTS, state.filteredPosts.slice(START, END));
      } else if (page === "albums") {
        commit(PAGINATE_ALBUMS, state.filteredAlbums.slice(START, END));
      }
      commit(SPINNING_LOADER_STATUS, false);
    },
    updateFilterWord({ commit }, payload) {
      commit(FILTER_WORD, payload);
    },
  },
  plugins: [vuexLocal.plugin],
});
