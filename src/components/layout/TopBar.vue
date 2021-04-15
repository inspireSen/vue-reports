<template>
  <nav class="navbar is-info">
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        <img src="@/assets/logo.png" alt="logo" height="28" />
        <span class="is-size-5 ml-2">Data Warehouse Reports</span>
      </router-link>

      <div
        href=""
        class="navbar-burger burger"
        @click.stop="toggleBurger = !toggleBurger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </div>
    </div>
    <div
      id="navbarMenu"
      class="navbar-menu"
      :class="{ 'is-active': toggleBurger }"
    >
      <div class="navbar-start"></div>
      <div class="navbar-end">
        <div @click="toggleBurger = false">
          <Menu class="is-hidden-desktop"></Menu>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Menu from "@/components/layout/Menu.vue";
export default {
  components: {
    Menu,
  },
  data: () => {
    return {
      toggleBurger: false,
    };
  },
};
</script>

<style>
</style>