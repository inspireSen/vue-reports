<template>
  <div>
    <h1 class="is-size-4 mb-2">
      Report 8 Detail - Year
      <span v-if="parentData">
        {{ parentData.Year }}
      </span>
    </h1>
    <div class="block" v-if="parentData">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Number of Memberships in the Year</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ parentData.Year }}</td>
            <td>{{ parentData.TotalNumberOfMembershipsInYear }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <loader v-if="loading" />

    <div class="block" v-show="dataSetTop25 && dataSetTop25.length > 0">
      <h2 class="is-size-5 mb-1">Top 25</h2>
      <table
        class="table is-striped is-hoverable is-fullwidth drill-down-table"
      >
        <thead>
          <tr>
            <th>Row</th>
            <th>Year</th>
            <th>State</th>
            <th>CityName</th>
            <th>MembershipCountInYearInCity</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in dataSetTop25"
            :key="index"
            @click="showYearCityDetail(data)"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ data.Year }}</td>
            <td>{{ data.State }}</td>
            <td
              :class="{
                'red-cell': data.MembershipCountInYearInCity >= 250,
                'yellow-cell': data.MembershipCountInYearInCity <= 30,
              }"
            >
              {{ data.CityName }}
            </td>
            <td>
              {{ data.MembershipCountInYearInCity }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block" v-show="dataSetBottom25 && dataSetBottom25.length > 0">
      <h2 class="is-size-5 mb-1">Bottom 25</h2>
      <table
        class="table is-striped is-hoverable is-fullwidth drill-down-table"
      >
        <thead>
          <tr>
            <th>Row</th>
            <th>Year</th>
            <th>State</th>
            <th>CityName</th>
            <th>MembershipCountInYearInCity</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in dataSetBottom25"
            :key="index"
            @click="showYearCityDetail(data)"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ data.Year }}</td>
            <td>{{ data.State }}</td>
            <td
              :class="{
                'red-cell': data.MembershipCountInYearInCity >= 250,
                'yellow-cell': data.MembershipCountInYearInCity <= 30,
              }"
            >
              {{ data.CityName }}
            </td>
            <td>
              {{ data.MembershipCountInYearInCity }}
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
  name: "Report8DetailYear",
  components: {
    Loader,
  },
  props: {
    parentData: null,
  },
  data: () => {
    return {
      dataSetTop25: [],
      dataSetBottom25: [],
      loading: false,
    };
  },

  created() {
    if (this.parentData !== null && this.parentData !== undefined) {
      this.loading = true;
      this.$api
        .get("report8/year", {
          params: {
            year: this.parentData.Year,
          },
        })
        .then((resp) => {
          this.dataSetTop25 = resp.data.top25;
          this.dataSetBottom25 = resp.data.bottom25;
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
    }
  },

  methods: {
    showYearCityDetail(data) {
      this.$api
        .get("report8/year/cityStoreCount", {
          params: {
            year: data.Year,
            city: data.CityName,
            state: data.State,
          },
        })
        .then((resp) => {
          if (resp.data.StoreCount > 1) {
            this.$router.push({
              name: "Report8DetailYearCity",
              params: { parentData: data },
            });
          } else if (resp.data.StoreCount === 1) {
            this.$toasted.info(
              `City ${data.CityName} has only 1 store. No further detail to be shown.`
            );
          } else if (resp.data.StoreCount === 0) {
            this.$toasted.info(
              `City ${data.CityName} has only 0 store. No further detail to be shown.`
            );
          } else {
            this.$toasted.error(`An error occured`);
          }
        })
        .catch((error) => {
          this.$toasted.error(
            `An error occured, unable to retrieve store count, see console for detail`
          );
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.drill-down-table tr {
  cursor: pointer;
}

.red-cell {
  background-color: #f44336;
  color: white;
}

.yellow-cell {
  background-color: #ffee58;
}
</style>
