<template>
  <div>
    <h1 class="is-size-4 mb-2">Report 7: Revenue by Population</h1>

    <loader v-if="loading" />

    <div class="block" v-show="dataSet && dataSet.length > 0">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>Year</th>
            <th>Small City Revenue</th>
            <th>Medium City Revenue</th>
            <th>Large City Revenue</th>
            <th>Extra Large City Revenue</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataSet" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.Year }}</td>
            <td>
              {{ data.Small === null ? "N/A" : moneyFormatter(data.Small) }}
            </td>
            <td>
              {{ data.Medium === null ? "N/A" : moneyFormatter(data.Medium) }}
            </td>
            <td>
              {{ data.Large === null ? "N/A" : moneyFormatter(data.Large) }}
            </td>
            <td>
              {{
                data["Extra Large"] === null
                  ? "N/A"
                  : moneyFormatter(data["Extra Large"])
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
  name: "Report7",
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
      .get("report7.json")
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