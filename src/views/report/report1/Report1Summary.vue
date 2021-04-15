<template>
  <div>
    <h1 class="is-size-4 mb-2">Report 1: Manufacturer's Product Report</h1>

    <loader v-if="loading" />

    <div class="block" v-show="dataSet && dataSet.length > 0">
      <table
        class="table is-striped is-hoverable is-fullwidth drill-down-table"
      >
        <thead>
          <tr>
            <th>Row</th>
            <th>Manufacturer Name</th>
            <th>Total Products</th>
            <th>Average Retail Price</th>
            <th>Minimum Retail Price</th>
            <th>Maximum Retail Price</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in dataSet"
            :key="index"
            @click="showDetail(data)"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ data.ManufacturerName }}</td>
            <td>{{ data.TotalProducts }}</td>
            <td>
              {{
                data.AverageRetailPrice === null
                  ? "N/A"
                  : moneyFormatter(data.AverageRetailPrice)
              }}
            </td>
            <td>
              {{
                data.MinimumRetailPrice === null
                  ? "N/A"
                  : moneyFormatter(data.MinimumRetailPrice)
              }}
            </td>
            <td>
              {{
                data.MaximumRetailPrice === null
                  ? "N/A"
                  : moneyFormatter(data.MaximumRetailPrice)
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import Loader from "@/components/layout/Loader.vue";
export default {
  name: "Report1Summary",
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
      .get("report1.json")
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
    showDetail(data) {
      this.$router.push({
        name: "Report1Detail",
        params: { parentData: data },
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

<style scoped>
.drill-down-table tr {
  cursor: pointer;
}
</style>
