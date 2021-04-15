<template>
  <div>
    <h1 class="is-size-4 mb-2">Report 8: Membership Trends</h1>
    <div class="block">
      <table
        class="table is-striped is-hoverable is-fullwidth drill-down-table"
      >
        <thead>
          <tr>
            <th>Row</th>
            <th>Year</th>
            <th>Total Number of Memberships in the Year</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(data, index) in dataSet"
            :key="index"
            @click="showYearDetail(data)"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ data.Year }}</td>
            <td>{{ data.TotalNumberOfMembershipsInYear }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Report8Summary",
  data: () => {
    return {
      dataSet: [],
    };
  },

  created() {
    this.$api
      .get("report8")
      .then((resp) => {
        this.dataSet = resp.data;
      })
      .catch((error) => {
        this.$toasted.error(
          `An error occured, unable to retrieve data, see console for detail`
        );
        console.log(error);
      });
  },

  methods: {
    showYearDetail(data) {
      this.$router.push({
        name: "Report8DetailYear",
        query: { year: data.Year, numOfMemberships: data.TotalNumberOfMembershipsInYear },
      });
    },
  },
};
</script>

<style scoped>
.drill-down-table tr {
  cursor: pointer;
}
</style>
