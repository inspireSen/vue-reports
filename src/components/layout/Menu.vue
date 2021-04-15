<template>
  <aside class="menu">
    <p class="menu-label">General</p>
    <ul class="menu-list">
      <li>
        <router-link
          to="/"
          :class="{
            'is-active':
              currentRouteName && currentRouteName.toLowerCase() === 'home',
          }"
          >Dashboard</router-link
        >
      </li>
    </ul>

    <p class="menu-label">Report</p>
    <ul class="menu-list">
      <li>
        <router-link
          to="/report1"
          :class="{
            'is-active': currentRoutePath === '/report1',
          }"
          >1. Manufacturer's Product</router-link
        >
      </li>
      <li>
        <router-link
          to="/report2"
          :class="{
            'is-active':
              currentRouteName && currentRouteName.toLowerCase() === 'report2',
          }"
          >2. Category</router-link
        >
      </li>
      <li>
        <router-link
          to="/report3"
          :class="{
            'is-active':
              currentRouteName && currentRouteName.toLowerCase() === 'report3',
          }"
          >3. Actual vs Predicted Revenue for GPS</router-link
        >
      </li>
      <li>
        <router-link
          to="/report4"
          :class="{
            'is-active':
              currentRouteName && currentRouteName.toLowerCase() === 'report4',
          }"
          >4. Store Revenue by Year by State</router-link
        >
      </li>
      <li>
        <router-link
          to="/report5"
          :class="{
            'is-active':
              currentRouteName && currentRouteName.toLowerCase() === 'report5',
          }"
          >5. Air Conditioners on Groundhog Day</router-link
        >
      </li>
      <li>
        <router-link
          to="/report6"
          :class="{
            'is-active':
              currentRouteName && currentRouteName.toLowerCase() === 'report6',
          }"
          >6. State w. Highest Volume Per Category</router-link
        >
      </li>
      <li>
        <router-link
          to="/report7"
          :class="{
            'is-active':
              currentRouteName && currentRouteName.toLowerCase() === 'report7',
          }"
          >7. Revenue by Population</router-link
        >
      </li>
      <li>
        <router-link
          to="/report8"
          :class="{
            'is-active': currentRoutePath === '/report8',
          }"
          >8. Membership Trends</router-link
        >
      </li>
    </ul>

    <p class="menu-label">Configuration</p>
    <ul class="menu-list">
      <li>
        <router-link
          to="/holiday"
          :class="{
            'is-active':
              currentRouteName && currentRouteName.toLowerCase() === 'holiday',
          }"
          >Holiday</router-link
        >
      </li>
      <li>
        <router-link
          to="/population"
          :class="{
            'is-active':
              currentRouteName &&
              currentRouteName.toLowerCase() === 'population',
          }"
          >City Population</router-link
        >
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: "Menu",
  props: {},
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
    currentRoutePath() {
      return this.$route.path;
    },
  },
};
</script>
<style scoped>
.menu {
  padding-left: 1rem;
  padding-right: 1rem;
}

.menu-list {
  font-weight: 450;
}
</style>