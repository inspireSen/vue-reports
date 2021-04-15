<template>
  <div class="tile is-ancestor">
    <div class="tile">
      <div class="tile is-vertical is-7">
        <div class="tile is-parent">
          <div class="tile is-child box report-box" @click="$router.push('/report1')">
            <div class="is-size-5 mb-2 has-text-weight-medium">
              Report 1 – Manufacturer’s Product Report
            </div>
            <p class="block">
              Displays the manufacturer’s name, total number of products offered
              by the manufacturer, average retail price of all the
              manufacturer’s products, minimum retail price, and maximum retail
              price for top 100 manufacturers sorted by average retail price.
            </p>
            <p class="block">
              Clicking manufacturer's name inside the report will display detail
              for the manufacturer including information for all products
              offered by the manufacturer.
            </p>
          </div>
        </div>
        <div class="tile">
          <div class="tile is-parent is-vertical">
            <div class="tile is-child box report-box" @click="$router.push('/report2')">
              <!-- Put any content you want -->
              <div class="is-size-5 mb-2 has-text-weight-medium">Report 2 – Category Report</div>
              <p class="block">
                This report displays category name, number of manufacturers, and
                average retail price for each category, sorted by category name
                ascending.
              </p>
            </div>
            <div class="tile is-child box report-box" @click="$router.push('/report3')">
              <!-- Put any content you want -->
              <div class="is-size-5 mb-2 has-text-weight-medium">
                Report 3 – Actual versus Predicted Revenue for GPS Units
              </div>
              <p class="block">
                This report compares how much revenue was actually generated
                from GPS sales to a predicted revenue if the product were never
                offered on sale.
              </p>
            </div>
          </div>
          <div class="tile is-parent">
            <div class="tile is-child box report-box" @click="$router.push('/report4')">
              <!-- Put any content you want -->
              <div class="is-size-5 mb-2 has-text-weight-medium">
                Report 4 – Store Revenue by Year by State
              </div>
              <p class="block">
                This report shows the revenue collected by stores per state
                grouped by year sorted by year in ascending and then by revenue
                in descending order.
              </p>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box report-box" @click="$router.push('/report5')">
            <!-- Put any content you want -->
            <div class="is-size-5 mb-2 has-text-weight-medium">
              Report 5 – Air Conditioners on Groundhog Day
            </div>
            <p class="block">
              Use this report to determine if the total number of units sold on
              Groundhog Day each year is significantly higher than the average
              number of units sold per day.
            </p>
          </div>
        </div>
      </div>
      <div class="tile is-vertical is-parent">
        <div class="tile is-child box report-box" @click="$router.push('/report6')">
          <!-- Put any content you want -->
          <div class="is-size-5 mb-2 has-text-weight-medium">
            Report 6 – State with Highest Volume for each Category
          </div>
          <p class="block">
            Use to recognize all stores in the states that sell the greatest
            number of units for each category. Allow choosing a year and month
            from the available dates in the database before running the report.
          </p>
        </div>

        <div class="tile is-child box report-box" @click="$router.push('/report7')">
          <div class="is-size-5 mb-2 has-text-weight-medium">Report 7 – Revenue by Population</div>
          <p class="block">
            This report helps forecast expansions into other cities.
          </p>
        </div>

        <div class="tile is-child box report-box" @click="$router.push('/report8')">
          <div class="is-size-5 mb-2 has-text-weight-medium">
            Report 8 – Membership Trends
          </div>
          <p class="block">
            This report tracks the number of new signups per city to help
            determine if more stores are needed in an area or if stores should
            be closed and consolidated.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewReports"
};
</script>

<style scoped>
.report-box {
  border-style: solid;
  border-width: 1px;
  border-color: lightgrey;
  border-radius: 1rem;
}
.report-box:hover {
  background-color: #1d72aa;
  cursor: pointer;
  color: white !important;
}
</style>>
