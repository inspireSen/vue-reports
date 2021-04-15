<template>
  <div>
    <h1 class="is-size-4 mb-2">Report 4: Store Revenue by Year by State</h1>
    <div class="block">
      <div class="control">
        <div class="select is-info is-medium">
          <select
            name="select-state"
            id="select-state"
            v-model="selectedState"
            @change="onStateChange($event)"
          >
            <option disabled value="">Select a State</option>
            <option v-for="(state, index) in states" :key="index">
              {{ state.State }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <loader v-if="loading" />

    <div class="block" v-show="revenueDataset && revenueDataset.length > 0">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>Store Number</th>
            <th>Store Address</th>
            <th>City Name</th>
            <th>Sales Year</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in revenueDataset" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.StoreNumber }}</td>
            <td>{{ data.StreetAddress }}</td>
            <td>{{ data.CityName }}</td>
            <td>{{ data.SalesYear }}</td>
            <td>{{ moneyFormatter(data.Revenue) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/layout/Loader.vue";
export default {
  name: "Report4",
  components: {
    Loader,
  },
  data: () => {
    return {
      states: [],
      revenueDataset: [],
      selectedState: "",
      loading: false,
    };
  },

  created() {
    this.$api
      .get("report4/states")
      .then((resp) => {
        this.states = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    onStateChange(event) {
      console.log(event);
      if (!this.selectedState || this.selectedState === "") {
        return;
      }

      this.revenueDataset = [];
      this.loading = true;
      this.$api
        .get("report4/revenueByState", {
          params: { state: this.selectedState },
        })
        .then((resp) => {
          this.revenueDataset = resp.data;
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
    moneyFormatter(price) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });
      return formatter.format(price);
    },
  },
};
</script>
