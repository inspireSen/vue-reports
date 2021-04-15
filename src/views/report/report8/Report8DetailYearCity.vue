<template>
  <div>
    <h1 class="is-size-4 mb-2">
      Report 8 Detail - Year
      <span v-if="parentData">
        {{ parentData.Year }}
      </span>
      - City
      <span v-if="parentData">
        {{ parentData.State }}, {{ parentData.CityName }}
      </span>
    </h1>
    <div class="block" v-if="parentData">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Year</th>
            <th>State</th>
            <th>CityName</th>
            <th>MembershipCountInYearInCity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ parentData.Year }}</td>
            <td>{{ parentData.State }}</td>
            <td>{{ parentData.CityName }}</td>
            <td>{{ parentData.MembershipCountInYearInCity }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="block">
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>Year</th>
            <th>Store Number</th>
            <th>Store Address</th>
            <th>State</th>
            <th>City</th>
            <th>Total Memberships Sold </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in dataSet" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ data.Year }}</td>
            <td>{{ data.StoreNumber }}</td>
            <td>{{ data.StreetAddress }}</td>
            <td>{{ data.State }}</td>
            <td>{{ data.CityName }}</td>
            <td>{{ data.MembershipCountInYearInCityInStore }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Report8DetailYearCity",
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
        .get("report8/year/city/stores", {
          params: {
            year: this.parentData.Year,
            city: this.parentData.CityName,
            state: this.parentData.State,
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
};
</script>