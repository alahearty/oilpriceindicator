<template>
  <div>
    <div id="chart">
        <apexchart type="line" height="450" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
export default{
  components: {
    apexchart: VueApexCharts,
  },
  methods:{
    GetChartData(){
      this.chartOptions = this.$store.getters.GetChartData
      this.series = this.$store.getters.GetChartSeries
    },
  },
  computed:{
    chartOptions(){
      return this.$store.getters.GetChartData
    },
    series(){
      return this.$store.getters.GetChartSeries
    }
  },
  mounted(){
    this.chartOptions = this.$store.getters.GetChartData
    this.series = this.$store.getters.GetChartSeries}
}
</script>

<style scoped lang="scss">
  
</style>
