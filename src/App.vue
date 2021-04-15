<template>
  <div>
    <TopBar />
    <div class="columns mt-1">
      <div
        id="side-menu"
        class="column is-narrow is-hidden-mobile is-hidden-tablet-only"
      >
        <Menu />
      </div>
      <div class="column container pl-4 pr-4">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Menu from "@/components/layout/Menu.vue";
import TopBar from "@/components/layout/TopBar.vue";
import Footer from "@/components/layout/Footer.vue";
export default {
  components: {
    Menu,
    Footer,
    TopBar,
  },
  data: () => {
    return {
      toggleBurger: false,
    };
  },
  computed: {},
  methods: {},
};
</script>
<style>
#side-menu {
  border-right-style: solid;
  border-right-color: lightgrey;
  border-right-width: 1px;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}

.fade-enter-active {
  transition-delay: 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
