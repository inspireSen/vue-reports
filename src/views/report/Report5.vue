<template>
  <div>
    <h1 class="is-size-4 mb-2">Report 5: Air Conditioners on Groundhog Day?</h1>

    <loader v-if="loading" />

    <div class="block" v-show="dataSet && dataSet.length > 0">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>Year</th>
            <th>Total Sold</th>
            <th>Average Number of Units Sold Per Day</th>
            <th>Total Units Sold on Groundhog</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataSet" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.Year }}</td>
            <td>{{ data.TotalNumSold }}</td>
            <td>{{ data.AveNumSold }}</td>
            <td>{{ data.GroundhogSold === null ? 0 : data.GroundhogSold }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/layout/Loader.vue";
export default {
  name: "Report5",
  components: {
    Loader,
  },
  data: () => {
    return {
      dataSet: [],
      loading: false,
    };
  },

  created() {
    this.loading = true;
    this.$api
      .get("report5")
      .then((resp) => {
        this.dataSet = resp.data;
      })
      .catch((error) => {
        this.$toasted.error(
          `An error occured, unable to retrieve data, see console for detail`
        );
        console.log(error);
      })
      .finally(() => {
        this.loading = false;
      });
  },

  computed: {},
  methods: {},
};
</script>

<style scoped>
</style>
