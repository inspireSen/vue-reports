<template>
  <div>
    <h1 class="is-size-4 mb-2">Report 2: Category</h1>
    <loader v-if="loading" />
    <div class="block" v-show="categories && categories.length > 0">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>Category Name</th>
            <th>Total Products</th>
            <th>Total Manufacturers</th>
            <th>Average Retail Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ category.CategoryName }}</td>
            <td>{{ category.TotalProducts }}</td>
            <td>{{ category.TotalManufacturers }}</td>
            <td>
              {{
                category.AverageRetailPrice === null
                  ? "N/A"
                  : moneyFormatter(category.AverageRetailPrice)
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
  name: "Report2",
  components: {
    Loader,
  },
  data: () => {
    return {
      categories: [],
      loading: false,
    };
  },

  created() {
    this.loading = true;
    this.$api
      .get("report2")
      .then((resp) => {
        this.categories = resp.data;
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
