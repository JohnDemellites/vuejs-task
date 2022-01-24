<template>
  <div class="select-box-container" v-click-outside="hideOptions" >
  <div class="select-box" :class="{ outline: isOptionsOpen }" @click="showOptions">
    <div class="place-holder">
      {{ selectedUsers.length }} users selected
    </div>
  </div>
  <div v-if="isOptionsOpen" class="select-options-container">
    <div class="option" v-for="(user, i) of users" :key="i" @click="filterUser(user.id)">
      <div class="option-text">{{ user.name }}</div>
      <div v-if="isUserSelected(user.id)" class="circle-icon"></div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  props: {
    isPostsPage: {
      type: Boolean,
      default: false
    },
    isAlbumsPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOptionsOpen: false
    }
  },
  computed: {
    ...mapGetters({
      selectedUsers: 'getSelectedUsers',
      users: 'getAllUsers'
    })
  },
  methods: {
    ...mapActions({
      selectUser: 'selectUser',
      getAllPostsOrAlbums: 'getAllPostsOrAlbums'
    }),
    showOptions() {
      this.isOptionsOpen = true
    },
    hideOptions() {
      this.isOptionsOpen = false
    },
    isUserSelected(userId) {
      const user = this.selectedUsers.find(e => e ===  userId)
      if (user) {
        return true
      } else {
        return false
      }
    },
    filterUser(userId) {
      this.selectUser(userId)
      if (this.isPostsPage) {
        this.getAllPostsOrAlbums('posts')
      }
      if (this.isAlbumsPage) {
        this.getAllPostsOrAlbums('albums')
      }
    }
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        if (typeof binding.value !== 'function') {
        	const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) { warn += `Found in component '${compName}'` }
          console.warn(warn)
        }
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
          	binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler
        document.addEventListener('click', handler)
			},
      unbind: function(el) {
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.select-box-container {
  width: 100%;
  max-width: 200px;
  position: relative;
  .select-box {
    padding: 8px;
    border-style: solid;
    border-width: 1px;
    border-radius: 2px;
    cursor: pointer;
    .place-holder {
      font-size: 13px;
      font-weight: bold;
      color: black;
      white-space: nowrap;
    }
  }
  .select-options-container {
    width: 100%;
    position: absolute;
    left: 0;
    top: 35px;
    background-color: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    .option {
      padding: 8px;
      cursor: pointer;
      transition: 0.3s all;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:hover {
        background-color: #d3d3d3;
      }
      .option-text {
        font-size: 13px;
        font-weight: bold;
      }
      .circle-icon {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fe3500;
      }
    }
  }
  .outline {
    outline-style: solid;
    outline-width: 1px;
    outline-color: black;
    outline-offset: -2px;
  }
}
</style>
