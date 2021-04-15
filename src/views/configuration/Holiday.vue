<template>
  <div>
    <h1 class="is-size-4 mb-2">Holiday</h1>

    <div class="block">
      <div class="is-size-5 mb-1">Add a New Holiday</div>
      <div id="add-holiday-form">
        <div class="field">
          <label class="label">Date</label>
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="Enter date in YYYY-MM-DD format"
              v-mask="'####-##-##'"
              v-model="newHoliday.date"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              type="text"
              class="input"
              placeholder="Enter holiday name"
              v-model="newHoliday.name"
            />
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" @click="addHoliday()">Add</button>
          </div>
          <div class="control">
            <button class="button is-light" @click="clearForm()">Clear</button>
          </div>
        </div>
      </div>
    </div>

    <div class="block">
      <div class="is-size-5 mb-1">List of Holidays</div>
      <table class="table is-striped is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Row</th>
            <th>Date</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(holiday, index) in holidays" :key="index">
            <th>{{ index + 1 }}</th>
            <td>{{ holiday.Date }}</td>
            <td>{{ holiday.Name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mask } from "vue-the-mask";
export default {
  name: "Holiday",
  directives: { mask },
  data: () => {
    return {
      holidays: [],
      newHoliday: {
        date: "",
        name: "",
      },
    };
  },

  created() {
    this.$api
      .get("holidays")
      .then((resp) => {
        this.holidays = resp.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    clearForm() {
      this.newHoliday = {
        date: "",
        name: "",
      };
    },
    addHoliday() {
      if (!this.validateForm(this.newHoliday)) {
        return;
      }

      const newHoliday = this.newHoliday;
      this.$api
        .post("holiday", {
          date: this.newHoliday.date,
          name: this.newHoliday.name,
        })
        .then((resp) => {
          this.holidays = resp.data;
          this.$toasted.success(
            `Holiday of ${newHoliday.date} | ${newHoliday.name} added successfully`
          );
        })
        .catch((error) => {
          console.log(error);
          this.$toasted.error(
            `An error occured, unable to add holiday ${newHoliday.date} | ${newHoliday.name}`
          );
        });

      this.clearForm();
    },
    validateForm(newHoliday) {
      if (newHoliday === null || newHoliday === undefined) {
        this.$toasted.error(`Invalid form.`);
        return false;
      } else if (!newHoliday.date) {
        this.$toasted.error(`Date cannot be null or empty`);
        return false;
      } else if (!newHoliday.name) {
        this.$toasted.error(`Name cannot be null or empty`);
        return false;
      } else if (!this.isDate(newHoliday.date)) {
        this.$toasted.error(`Invalid Date`);
        return false;
      } else if (this.newHoliday.name.length > 100) {
        this.$toasted.error(`Holiday name cannot exceed 100 characters`);
        return false;
      } else if (this.holidays.some((h) => h.Date === newHoliday.date)) {
        this.$toasted.error(`Date ${newHoliday.date} already exists`);
        return false;
      }

      return true;
    },

    isDate(dateStr) {
      return new Date(dateStr) !== "Invalid Date" && !isNaN(new Date(dateStr));
    },
  },
};
</script>

<style scoped>
#add-holiday-form {
  max-width: 500px;
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
  padding: 1rem;
}
</style>
