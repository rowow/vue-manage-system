<template>
  <div>Home</div>
</template>

<script>
export default {
  mounted() {
    this.$http.get("/home/getData").then(res => {
      console.log(res.data);
    });
  }
};
</script>

<style></style>
