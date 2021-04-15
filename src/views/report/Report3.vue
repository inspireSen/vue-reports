<template>
  <div>
    <h1 class="is-size-4 mb-2">
      Report 3: Actual vs Predicted Revenue for GPS
    </h1>
    <loader v-if="loading" />
    <div class="block" v-show="dataSet && dataSet.length > 0">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>PID</th>
            <th>Product Name</th>
            <th>Retail Price</th>
            <th>Total Units Ever Sold</th>
            <th>Total Units Sold on Discount</th>
            <th>Difference in Actual vs Predicated Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataSet" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.PID }}</td>
            <td>{{ data.ProductName }}</td>
            <td>
              {{
                data.RetailPrice === null
                  ? "N/A"
                  : moneyFormatter(data.RetailPrice)
              }}
            </td>
            <td>{{ data.TotalUnitsEverSold }}</td>
            <td>{{ data.TotalUnitsSoldOnDiscount }}</td>
            <td>{{ moneyFormatter(data.DiffActualPredicated) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/layout/Loader.vue";
export default {
  name: "Report3",
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
      .get("report3")
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

  methods: {
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

<style scoped>
</style>
