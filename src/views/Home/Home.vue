<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="user-info">
            <p class="name">Nick</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2019-10-20</span></p>
          <p>上次登录地点：<span>深圳</span></p>
        </div>
      </el-card>
      <el-card style="height:438px;margin-top:20px;" shadow="hover">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :label="val"
            :prop="key"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="r-header">
        <el-card
          shadow="hover"
          v-for="item in priceData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥ {{ item.price }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart :chartData="echartData.order" style="height:280px;"></echart>
      </el-card>
      <div class="r-footer">
        <el-card shadow="hover">
          <echart style="height:260px;"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart style="height:260px;"></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "@/components/ECharts";
export default {
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      priceData: [
        {
          name: "今日支付订单",
          price: 1234,
          icon: "circle-check",
          color: "#BFEFFF"
        },
        {
          name: "今日收藏订单",
          price: 201,
          icon: "star-off",
          color: "#CDAD00"
        },
        {
          name: "今日未支付订单",
          price: 90,
          icon: "goods",
          color: "#63B8FF"
        },
        {
          name: "本月支付订单",
          price: 1234,
          icon: "circle-check",
          color: "#BFEFFF"
        },
        {
          name: "本月收藏订单",
          price: 201,
          icon: "star-off",
          color: "#CDAD00"
        },
        {
          name: "本月未支付订单",
          price: 90,
          icon: "goods",
          color: "#63B8FF"
        }
      ],
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        totalBuy: "全部购买",
        monthBuy: "本月购买"
      },
      // 三个echart图表的数据
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  methods: {
    getData() {
      this.$http.get("/home/getData").then(res => {
        res = res.data;
        this.tableData = res.data.tableData;
        // 订单折线图
        const order = res.data.orderData;
        this.echartData.order.xData = order.date;
        // 第一步：取出series中的name部分---键名
        let keyArr = Object.keys(order.data[0]);

        keyArr.forEach(key => {
          this.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: order.data.map(item => item[key]),
            type: "line"
          });
        });
      });
    }
  },
  created() {
    this.getData();
  },
  components: {
    Echart
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home.scss";
</style>
