<template>
  <div id="app">
    <NavigationBar />
    <div id="body">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    NavigationBar,
    Footer,
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway&display=swap");
* {
  font-family: "Raleway", sans-serif;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  color: black;
  min-height: 100vh;
  #body {
    max-width: 1200px;
    margin: 0 auto 32px;
    padding: 0 32px;
    min-height: 100vh;
  }
}
</style>
