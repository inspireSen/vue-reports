<template>
  <div>
    <h1 class="is-size-4 mb-2">
      Report 6: State with Highest Volume for each Category
    </h1>

    <div class="block">
      <div class="control">
        <div class="select is-info is-medium">
          <select
            v-model="selectedYearMonth"
            @change="onSelectionChange($event)"
          >
            <option disabled value="">Select a Month</option>
            <option v-for="(month, index) in months" :key="index">
              {{ month.YearMonth }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <loader v-if="loading" />

    <div
      class="block"
      v-show="monthVolumeDataset && monthVolumeDataset.length > 0"
    >
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>Category Name</th>
            <th>State That Sold the Most</th>
            <th>Total Units Sold in the State</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in monthVolumeDataset" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.CategoryName }}</td>
            <td>{{ data.State }}</td>
            <td>{{ data.NumUnitSold }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/layout/Loader.vue";
export default {
  name: "Report6",
  components: {
    Loader,
  },
  data: () => {
    return {
      months: [],
      monthVolumeDataset: [],
      selectedYearMonth: "",
      loading: false,
    };
  },

  created() {
    this.$api
      .get("report6/months")
      .then((resp) => {
        this.months = resp.data;
      })
      .catch((error) => {
        this.$toasted.error(
          `An error occured, unable to retrieve data, see console for detail`
        );
        console.log(error);
      });
  },

  methods: {
    onSelectionChange(event) {
      console.log(event);
      if (!this.selectedYearMonth || this.selectedYearMonth === "") {
        return;
      }
      this.monthVolumeDataset = [];
      this.loading = true;
      this.$api
        .get("report6/volumeByMonth", {
          params: { yearMonth: this.selectedYearMonth },
        })
        .then((resp) => {
          this.monthVolumeDataset = resp.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
</style>
