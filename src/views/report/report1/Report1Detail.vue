<template>
  <div>
    <h1 class="is-size-4 mb-2">
      Report 1 Detail:
      <span v-if="parentData">
        {{ parentData.ManufacturerName }}
      </span>
    </h1>
    <div class="block" v-if="parentData">
      <h2 v-if="parentData" class="is-size-5">
        {{ parentData.ManufacturerName }} Summary
      </h2>
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Name</th>
            <th>Max Discount</th>
            <th>Total Products</th>
            <th>Average Retail Price</th>
            <th>Minimum Retail Price</th>
            <th>Maximum Retail Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ parentData.ManufacturerName }}</td>
            <td>{{ parentData.MaxDiscount }}</td>
            <td>{{ parentData.TotalProducts }}</td>
            <td>
              {{
                parentData.AverageRetailPrice === null
                  ? "N/A"
                  : moneyFormatter(parentData.AverageRetailPrice)
              }}
            </td>
            <td>
              {{
                parentData.MinimumRetailPrice === null
                  ? "N/A"
                  : moneyFormatter(parentData.MinimumRetailPrice)
              }}
            </td>
            <td>
              {{
                parentData.MaximumRetailPrice === null
                  ? "N/A"
                  : moneyFormatter(parentData.MaximumRetailPrice)
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <h2 class="is-size-5">Manufacturer's Products</h2>
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>Product PID</th>
            <th>Product Name</th>
            <th>Product Retail Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataSet" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.ProductPID }}</td>
            <td>{{ data.ProductName }}</td>
            <td>
              {{
                data.ProductRetailPrice === null
                  ? "N/A"
                  : moneyFormatter(data.ProductRetailPrice)
              }}
            </td>
            <td>{{ data.Category }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Report1Detail",
  props: {
    parentData: null,
  },
  data: () => {
    return {
      dataSet: [],
    };
  },

  created() {
    if (this.parentData !== null && this.parentData !== undefined) {
      this.$api
        .get("report1/detail", {
          params: {
            manufacturerName: this.parentData.ManufacturerName,
          },
        })
        .then((resp) => {
          this.dataSet = resp.data;
        })
        .catch((error) => {
          this.$toasted.error(
            `An error occured, unable to retrieve data, see console for detail`
          );
          console.log(error);
        });
    }
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
