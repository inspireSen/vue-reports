<template>
  <div>
    <h1 class="is-size-4 mb-2">City Population</h1>
    <div class="columns">
      <div class="column">
        <div class="block">
          <table
            class="table is-striped is-hoverable is-fullwidth selectable-down-table"
          >
            <thead>
              <tr>
                <th>Row</th>
                <th>State</th>
                <th>City</th>
                <th>Population</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(city, index) in cities"
                :key="index"
                :class="{ 'is-selected': selectedRowIndex === index }"
                @click="selectRow(city, index)"
              >
                <th>{{ index + 1 }}</th>
                <td>{{ city.State }}</td>
                <td>{{ city.CityName }}</td>
                <td>{{ city.Population }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="block" id="edit-population-section">
          <div class="is-size-5 mb-1">Edit Population</div>
          <div id="edit-population-form">
            <div class="field">
              <span class="bold-text">State: </span>
              <span v-if="cityToEdit" class="mr-3">{{ cityToEdit.State }}</span>
            </div>
            <div class="field">
              <span class="bold-text">City: </span>
              <span v-if="cityToEdit">{{ cityToEdit.CityName }}</span>
            </div>
            <div class="field">
              <label class="label">Population:</label>
              <div v-if="cityToEdit" class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="Population"
                  v-mask="'##########'"
                  v-model="cityToEdit.Population"
                />
              </div>
              <div v-else class="control">
                <input
                  type="text"
                  class="input"
                  placeholder="Population"
                  disabled
                />
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button
                  :disabled="!cityToEdit"
                  class="button is-link"
                  @click="submitForm()"
                >
                  Submit
                </button>
              </div>
              <div class="control">
                <button
                  :disabled="!cityToEdit"
                  class="button is-light"
                  @click="clearForm()"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";
export default {
  name: "CityPopulation",
  directives: { mask },
  data: () => {
    return {
      cities: [],
      cityToEdit: null,
      selectedRowIndex: null,
      validationError: "",
    };
  },

  created() {
    this.$api
      .get("cities")
      .then((resp) => {
        this.cities = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    submitForm() {
      if (!this.validateForm(this.cityToEdit)) {
        return;
      }

      const cityToEdit = this.cityToEdit;
      this.$api
        .post("city", {
          cityName: this.cityToEdit.CityName,
          stateName: this.cityToEdit.State,
          population: this.cityToEdit.Population,
        })
        .then((resp) => {
          this.cities = resp.data;
          this.$toasted.success(
            `Population of ${cityToEdit.State} | ${cityToEdit.CityName} updated to ${cityToEdit.Population}.`
          );
        })
        .catch((error) => {
          console.log(error);
          this.$toasted.error(
            `An error occured, unable to update population for ${cityToEdit.State} | ${cityToEdit.CityName}.`
          );
        });
      this.clearForm();
    },
    clearForm() {
      this.cityToEdit = null;
      this.selectedRowIndex = null;
    },
    selectRow(city, index) {
      this.cityToEdit = {};
      Object.assign(this.cityToEdit, city);
      this.selectedRowIndex = index;
    },
    validateForm(cityToEdit) {
      if (cityToEdit === null || cityToEdit === undefined) {
        this.$toasted.error(`Invalid form.`);
        return false;
      } else if (!cityToEdit.CityName) {
        this.$toasted.error(`CityName cannot be null or empty`);
        return false;
      } else if (!cityToEdit.State) {
        this.$toasted.error(`State cannot be null or empty`);
        return false;
      } else if (cityToEdit.Population > 2000000000) {
        this.$toasted.error(`Population exceed maximum allowed number`);
        return false;
      }

      return true;
    },
  },
};
</script>
<style scoped>
#edit-population-form {
  max-width: 500px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
  padding: 1rem;
}

.bold-text {
  font-weight: bold;
}

#edit-population-section {
  min-width: 350px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
}

.selectable-down-table tr {
  cursor: pointer;
}
</style>
