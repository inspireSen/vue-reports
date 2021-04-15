<template>
  <div>
    <div class="is-size-5 mb-2">Statistics</div>
    <div id="status-section" class="columns block">
      <div class="column">
        <div class="box has-background-primary-dark">
          <div>Total Stores</div>
          <div class="level">
            <div class="level-item is-size-1">{{ stats.stores }}</div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box has-background-info-dark">
          <div>Total Manufacturers</div>
          <div class="level">
            <div class="level-item is-size-1">{{ stats.manufacturers }}</div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box has-background-warning-dark">
          <div>Total Products</div>
          <div class="level">
            <div class="level-item is-size-1">{{ stats.products }}</div>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box has-background-danger-dark">
          <div>Membership Sold</div>
          <div class="level">
            <div class="level-item is-size-1">{{ stats.memberships }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="is-size-5 mb-4">Update Configuration</div>
      <div class="columns">
        <div class="column">
          <router-link to="/holiday" class="button is-fullwidth is-info mb-4">
            View/Edit Holiday
          </router-link>
        </div>
        <div class="column">
          <router-link
            to="/population"
            class="button is-fullwidth is-info mb-4"
          >
            View/Edit City Population
          </router-link>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="is-size-5 mb-4">View Reports</div>
      <ViewReports></ViewReports>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ViewReports from "@/components/dashboard/ViewReports.vue";
export default {
  name: "Home",
  components: {
    ViewReports,
  },
  data: () => {
    return {
      stats: {
        manufacturers: 0,
        memberships: 0,
        products: 0,
        stores: 0,
      },
    };
  },

  created() {
    this.$api
      .get("stats.json")
      .then((resp) => {
        this.stats = resp.data;
      })
      .catch((error) => {
        //TODO: handle error, show error toast message on UI?
        console.log(error)
      });
  },
};
</script>
<style scoped>
.box {
  height: 150px;
  color: white;
}
.count {
  height: 100%;
}
#settings-section {
  max-width: 400px;
}
</style>