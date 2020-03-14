<template>
  <div style="height:100%" ref="echart">echart</div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    // 需要传进来的数据
    chartData: {
      type: Object,
      default() {
        // default设置为函数是与vue中的data一个道理(作用域)
        return {
          xData: [], // x轴数据
          series: [] // y轴系列
        };
      }
    },
    // 传入是否有轴
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    }
  },
  data() {
    return {
      echart: null, // 创建echart对象
      // 有坐标轴
      axisOption: {
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: []
      },
      // 没有坐标轴
      normalOption: {
        series: []
      }
    };
  },
  watch: {
    chartData: {
      handler: function() {
        this.initChart();
      },
      deep: true
    }
  },
  methods: {
    // 初始化echarts图表
    initChart() {
      this.initChartData();
      //   判断是否存在
      if (this.echart) {
        // 已存在，显示图表
        this.echart.setOption(this.options);
        console.log(1);
      } else {
        // 未存在，初始化+显示图表
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
        console.log(2);
      }
    },
    // 初始化图表数据
    initChartData() {
      // 判断是有坐标轴还是没有
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        console.log("normal");
      }
    }
  }
};
</script>

<style></style>
