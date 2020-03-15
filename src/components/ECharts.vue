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
    },
    // store中的隐藏显示左边栏状态
    isCollapse() {
      return this.$store.state.menu.isCollapse;
    }
  },
  data() {
    return {
      echart: null, // 创建echart对象
      // 有坐标轴
      axisOption: {
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#96CDCD"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#96CDCD"
            }
          }
        },
        legend: {
          textStyle: {
            color: "red" // 图例表头文字样式
          }
        },
        grid: {
          left: "20%" // 表格离左边宽度
        },
        tooltip: {
          trigger: "axis" // 触发类型：坐标轴(鼠标移入轴线显示数据)
        },
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ],
        series: []
      },
      // 没有坐标轴
      normalOption: {
        series: [],
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        tooltip: {
          trigger: "item" // 触发类型：饼状图(鼠标移入饼块显示数据)
        }
      }
    };
  },
  watch: {
    chartData: {
      handler: function() {
        this.initChart();
      },
      deep: true
    },
    isCollapse() {
      // 设置延时300毫秒自适应
      setTimeout(() => {
        this.resizeChart();
      }, 300);
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
      } else {
        // 未存在，初始化+显示图表
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    // 初始化图表数据
    initChartData() {
      // 判断是有坐标轴还是没有
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
    // echart自适应
    resizeChart() {
      // 如果echart对象存在，则重置
      this.echart ? this.echart.resize() : "";
    }
  },
  // 在mounted周期中添加事件监听图表自适应，在destroyed周期中移出该方法
  mounted() {
    window.addEventListener("resize", this.resizeChart);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart);
  }
};
</script>

<style></style>
